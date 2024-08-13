<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { EnumModeErrorResponse } from "../../ts/enums";

const schema = {
  fullname: Yup.string().required("Fullname is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
};

const router = useRouter();

const isPwd = ref(true);
const loading = ref(false);

const onSubmit = async (values: any) => {
  loading.value = true;
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
    );
    if (response) {
      await setDoc(doc(db, "users", response.user.uid), {
        id: response.user.uid,
        fullname: values.fullname,
        email: values.email,
        avatar: "",
        isConnected: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).then(() => {
        toast.success("Sign up successfully", {
          onClose: () => {
            router.push({
              name: "Login",
            });
          },
        });
      });
    }
    loading.value = false;
  } catch (err: any) {
    loading.value = false;
    if (err.code === EnumModeErrorResponse.EMAIL_ALREADY_IN_USE) {
      return toast.error("Sign up error! Email already in use...");
    }
    return toast.error(err.message);
  }
};
</script>

<template>
  <div
    class="background-auth bg-gray-7 flex flex-justify-center flex-items-center"
  >
    <div
      class="bg-white flex flex-col flex-justify-center flex-items-center p-8 border-rd-xl"
    >
      <span class="font-medium text-md text-gray-5">Welcome! 👋</span>
      <span class="text-3xl font-bold mb-8"> Create your account</span>
      <div>
        <Form
          :validation-schema="schema"
          @submit="onSubmit"
          v-slot="{ errors }"
          class="flex flex-col flex-justify-center"
        >
          <div class="form-group mb-5">
            <label class="font-bold">Fullname</label>
            <Field
              name="fullname"
              type="text"
              class="form-control"
              :disabled="loading"
              :class="{ 'is-invalid': errors.fullname }"
            />
            <div class="invalid-feedback">{{ errors.fullname }}</div>
          </div>
          <div class="form-group mb-5">
            <label class="font-bold">Email</label>
            <Field
              name="email"
              type="email"
              class="form-control"
              :disabled="loading"
              :class="{ 'is-invalid': errors.email }"
            />
            <div class="invalid-feedback">{{ errors.email }}</div>
          </div>
          <div class="form-group mb-5">
            <label class="font-bold">Password</label>
            <div class="relative">
              <Field
                name="password"
                :type="isPwd ? 'password' : 'text'"
                class="form-control"
                :disabled="loading"
                :class="{ 'is-invalid': errors.password }"
              />
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer absolute top-1/2 -translate-y-1/2 right-2"
                @click="isPwd = !isPwd"
              />
            </div>
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>
          <q-btn
            color="primary"
            label="Singup"
            type="submit"
            size="15px"
            :loading="loading"
          />
        </Form>
        <div class="font-medium text-sm mt-3 text-center">
          <span class="text-gray-4"
            >Already have an account?
            <router-link to="/login">Login</router-link></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
}

.form-control {
  padding: 10px;
  min-width: 320px;
}

.invalid-feedback {
  height: 20px;
  font-size: small;
  color: red;
}
</style>

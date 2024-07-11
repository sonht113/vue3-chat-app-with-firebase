<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { RouterLink, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { EnumModeErrorResponse } from "../../ts/enums";
import { doc, getDoc } from "firebase/firestore";
import { userStore } from "../../stores/user-store";
import { UserDataType } from "../../ts/types";

const schema = {
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
};

const router = useRouter();

const store = userStore();

const isPwd = ref(true);
const loading = ref(false);

const onSubmit = async (values: any) => {
  loading.value = true;
  await signInWithEmailAndPassword(auth, values.email, values.password)
    .then(async (res: any) => {
      if (res) {
        await getDoc(doc(db, 'users', res.user.uid)).then((res) => {
          const data = res.data();
          if (data) {
            store.setUser(data as UserDataType)
          }
        })
        localStorage.setItem("token", res._tokenResponse.idToken);
        localStorage.setItem("id", res.user.uid);
        toast.success("Login successfully", {
          onClose: () => {
            router.push({
              name: "Home",
            });
          },
        });
      }

      loading.value = false;
    })
    .catch((err) => {
      loading.value = false;
      if (err.code === EnumModeErrorResponse.INVALID_EMAIL) {
        return toast.error("Email invalid...");
      }
      if (err.code === EnumModeErrorResponse.USER_NOT_FOUND) {
        return toast.error("This email is not registered ...");
      }
      if (err.code === EnumModeErrorResponse.WRONG_PASSWORD) {
        return toast.error("Password invalid...");
      }
    });
};
</script>

<template>
  <div
    class="background-auth bg-gray-7 flex flex-justify-center flex-items-center"
  >
    <div
      class="bg-white flex flex-col flex-justify-center flex-items-center p-8 border-rd-xl"
    >
      <span class="font-medium text-md text-gray-5">Welcome back! 👋</span>
      <span class="text-3xl font-bold mb-8">Login to your account</span>
      <div>
        <Form
          :validation-schema="schema"
          @submit="onSubmit"
          v-slot="{ errors }"
          class="flex flex-col flex-justify-center"
        >
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
            label="Login"
            type="submit"
            size="15px"
            :loading="loading"
          />
        </Form>
        <div class="font-medium text-sm mt-3 text-center">
          <span class="text-gray-4"
            >Create an new account?
            <router-link to="/sign-up">Sign-up</router-link></span
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

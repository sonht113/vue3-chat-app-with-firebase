<template>
  <div v-if="filesUpload.length" class="flex flex-nowrap items-start gap-2 w-full overflow-auto h-[65px] bg-gray-2 absolute bottom-[60px] left-0 px-1">
    <div v-for="(fileUp, index) in filesUpload" :key="fileUp.id">
      <div class="relative">
        <div
          v-if="fileUp.progress > 1"
          @click="deleteFile(index, fileUp.id)"
          class="group absolute z-3 top-1 right-1 flex items-center justify-center cursor-pointer w-[15px] h-[15px] rounded-full bg-gray-300 hover:bg-gray-4"
        > 
          <font-awesome-icon
            :icon="['fas', 'xmark']"
            class="text-black text-sm cursor-pointer"
          />
          <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 10]"
          >
            <em>Xóa</em>
          </q-tooltip>
        </div>
        <q-skeleton v-if="fileUp.progress < 1 && !fileUp.error" class="w-[60px] h-[60px]" />
        <q-img
          v-if="fileUp.progress > 1 && !fileUp.error"
          :src="filesAfterUpload[index]"
          spinner-color="white"
          style="width: 60px; height: 60px; object-fit: cover;"
        />
        <q-img
          v-if="fileUp.error"
          src="https://cdn.quasar.dev/img/non-existent-image-src.png"
          style="width: 60px; height: 60px; object-fit: cover;"
        >
          <template v-slot:error>
            <div class="w-full h-full !p-0 flex items-center justify-center bg-negative text-white text-xs !px-1">
              <small>Cannot load image</small>
            </div>
          </template>
        </q-img>
        <q-linear-progress :value="fileUp.progress" rounded color="secondary" class="q-mt-sm absolute bottom-0 z-2" />
      </div>
    </div>
  </div>
  <div
    class="action-chat flex items-center justify-between px-2 w-full h-[60px] absolute bottom-0 border-t-1 border-t-solid border-t-gray-1 bg-white"
  >
    <div>
      <label for="file">
        <font-awesome-icon
          :icon="['fas', 'image']"
          class="text-2xl cursor-pointer text-gray-6"
        />
      </label>
      <input id="file" type="file" multiple class="hidden" accept="image/*" @change="onChangeFile" />
    </div>

    <div class="flex items-center">
      <input
        class="input-chat rounded-full px-3 py-2"
        v-model="innerContent"
      ></input>
      <q-btn
        @click="handleSendMessage"
        :disabled="filesUpload.some(file => file.progress < 1) || loadingSendMessage"
        round
        dense
        flat
        color="primary"
        icon="send"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import {deleteObject, getDownloadURL, ref as refStorage, uploadBytesResumable} from 'firebase/storage';
import {v4 as uuid} from 'uuid';
import { storage } from "@/firebase";

export default defineComponent({
  name: "InputChat",
  props: {
    content: {
      type: String,
      default: "",
    },
    files: {
      type: Array<string>,
      default: [],
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  emits: ["update:content", "update:files", "sendMessage"],
  setup(props, context) {

    const filesUpload = ref<{
      file: File,
      progress: number;
      id: string;
      error: boolean;
    }[]>([]);

    const idx = ref<number>(0);

    const filesAfterUpload = computed(() => {
      return props.files;
    });

    const loadingSendMessage = computed(() => {
      return props.loading;
    })

    watch(filesAfterUpload, () => {
      if(filesAfterUpload.value.length === 0) {
        idx.value = 0;
        filesUpload.value = [];
      }
    })

    const innerContent = computed({
      get: () => props.content,
      set: (newValue) => {
        context.emit("update:content", newValue);
      },
    });

    /**
     * Emit event sendMessage.
     */
    const handleSendMessage = () => {
      context.emit("sendMessage");
    };

    /**
     * Handle when user selects files to upload.
     * @param {Event} e - Event when user selects files to upload.
     */
    const onChangeFile = (e: any) => {
      const arrFile = Array.from(e.target.files).entries();
      for(const [index, file] of arrFile) {
        const id = uuid();
        filesUpload.value.push({file: file as File, progress: 0, id: id, error: false});
        const storageRef = refStorage(storage, id);
        const upload = uploadBytesResumable(storageRef, file as any);
        const position = idx.value === 0 ? index : idx.value + index;
        upload.on('state_changed', (snapshot) => {
          const prg = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          filesUpload.value[position].progress = prg;
        }, (error) => {
          if (error) {
            filesUpload.value[position].error = true;
          }
        }, () => {
          getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
            context.emit("update:files", [...props.files, downloadURL]);
          });
        })
      }
      idx.value = filesAfterUpload.value.length;
    }

    /**
     * Delete a file from the list of files to be uploaded.
     * @param {number} index - Index of the file in the list.
     * @param {string} id - Id of the file to be deleted.
     */
    const deleteFile = (index: number, id: string) => {
      console.log("id: ", id);
      const storageRef = refStorage(storage, id);
      deleteObject(storageRef).then(() => {
        filesUpload.value.splice(index, 1);
        context.emit("update:files", filesAfterUpload.value.filter((_, i) => i !== index));
      })
      
    }

    return {
      innerContent,
      handleSendMessage,
      onChangeFile,
      filesUpload,
      filesAfterUpload,
      deleteFile,
      loadingSendMessage,
    };
  },
});
</script>

<style scoped>
.input-chat .q-field__control {
  min-height: 48px !important;
  height: 48px !important;
}

.input-chat::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <div>
    <Dialog v-model:open="showForm">
      <DialogContent class="sm:max-w-[625px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('banner') }}</DialogTitle>
          <DialogDescription>
            {{ $t('banner_form_desc') }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4 py-4">
            <div>
              <!-- Name Field -->
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('title') }}</Label>
                <Textarea rows="9" v-model="banner.title" class="col-span-3"  />
              </div>
            </div>

            <div>
              <div class="flex flex-col items-start justify-center mb-3">
                <Label for="image" class="text-left mb-1">{{ $t('preview') }}</Label>
                <div class="h-[8.2rem] w-full border rounded-md">
                  <img v-if="banner.imageUrl" :src="banner.imageUrl" alt="banner Logo"
                    class="w-full h-full  object-cover bg-cover rounded-md">
                </div>
              </div>
              <!-- Image URL Field -->
              <div class="flex flex-col items-start justify-center mb-3">
                <Label for="image" class="text-left mb-1">{{ $t('upload_image') }}</Label>
                <Input id="image" type="file" @onChange="handleFileInput" @input="handleFileInput" class="col-span-3"
                  accept="image/jpeg,image/png,image/gif" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" @click="$emit('closeForm')">
              Cancel
            </Button>
            <Button type="submit" variant="outline">{{ $t('save') }}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '.././ui/dialog'
import { Button } from '.././ui/button'
import { Input } from '.././ui/input'
import { Textarea } from '.././ui/textarea'
import { Label } from '.././ui/label'
import { useToast } from '.././ui/toast/use-toast'
import { useI18n } from 'vue-i18n'
import type BannerModel from '../../scripts/model/banner/BannerModel.ts'
import { createBanner } from '../../scripts/model/banner/BannerModel.ts'
import { createBannerHandler, updateBannerHandler } from '../../scripts/handler/banner/BannerHandler.ts'
import type { Emitter } from 'mitt';

const props = defineProps({
  banner: {
    type: Object,
    required: true,
  },
  showForm: {
    type: Boolean,
    required: true
  }
})

console.log(props)
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const { t } = useI18n()
const { toast } = useToast()

// Define Variable
const previewImage = ref(props.banner.imageUrl)
const banner = ref(props.banner)
const showForm = ref(props.showForm)
const status = ref("New")

// Define props and emits
const emit = defineEmits(['updateForm', "closeForm"])

// Define methods
const handleFileInput = (event: { target: { files: any[]; }; }) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    banner.value.imageUrl = reader.result
  }
  reader.readAsDataURL(file)
}

const onHandleSummitForm = async () => {
  if(status.value == "New") onHandleCreateBanner()
  else onHandleUpdateBanner()
}

const onHandleUpdateBanner = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { message, data, statusCode } = await updateBannerHandler(banner.value as BannerModel);
    console.log(message, data, statusCode);
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('update_banner_success'),
        variant: 'success',
        title: t("success"),
      });
      emit('closeForm')
    }
  } catch (e) {
    console.log(e)
  } finally {
    setTimeout(() => {
      emitter?.emit("stateLoading", false);
    }, 500);
  }
}

const onHandleCreateBanner = async () => {
  try {
    emitter?.emit("stateLoading", true);
    banner.value.imageUrl = "https://picsum.photos/512/513"
    const { message, data, statusCode } = await createBannerHandler(banner.value as BannerModel);
    console.log(message, data, statusCode);
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('create_banner_success'),
        variant: 'success',
        title: t("success"),
      });
      emit('closeForm')
    }
  } catch (e) {
    console.log(e)
  } finally {
    setTimeout(() => {
      emitter?.emit("stateLoading", false);
    }, 500);
  }
}

// Define Watch
watch(
  () => [props.banner, props.showForm],
  () => {
    if (props.banner && props.banner._id && props.banner._id) {
      banner.value = createBanner(props.banner);
      status.value = "Update";
    } else {
      banner.value = createBanner();
      status.value = "New";
      previewImage.value = "";
    }
    showForm.value = props.showForm
  }, { immediate: true, })
</script>
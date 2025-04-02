<template>
  <div>
    <Dialog :open="showForm" @update:open="emit('update:open', $event)">
      <DialogContent class="sm:max-w-[600px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('ministry') }}</DialogTitle>
          <DialogDescription>
            {{ $t('ministry_form_desc') }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-2 py-4">
            <div>
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('name') }}</Label>
                <Textarea rows="2" v-model="ministry.en.name" required class="col-span-3" />
              </div>

              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('name_kh') }}</Label>
                <Textarea rows="2" v-model="ministry.kh.name" required class="col-span-3" />
              </div>
            </div>

            <div class="">
              <!-- Preview -->
              <div class="flex flex-col items-start justify-center mb-3 col-span-2">
                <Label class="text-left mb-1">{{ $t('preview') }}</Label>
                <div class="h-[6.5rem] w-full border rounded-md">
                  <img v-if="previewImage" :src="previewImage" alt="Partner Logo"
                    class="w-full h-full  object-cover bg-cover rounded-md">
                </div>
              </div>
              <!-- Upload Image -->
              <div class="flex justify-center items-end mb-3 col-span-1">
                <Input type="file" :required="!previewImage" @onChange="handleFileInput" @input="handleFileInput"
                  class=" col-span-3" accept="image/jpeg,image/png,image/gif" />
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
} from '../ui/dialog/index.ts'
import { Button } from '../ui/button/index.ts'
import { Input } from '../ui/input/index.ts'
import { Textarea } from '../ui/textarea/index.ts'
import { Label } from '../ui/label/index.ts'
import { useToast } from '../ui/toast/use-toast.ts'
import { useI18n } from 'vue-i18n'
import type MinistryModel from '../../scripts/model/ministry/MinistryModel.ts'
import { createMinistry } from '../../scripts/model/ministry/MinistryModel.ts'
import { uploadFileHandler } from '../../scripts/handler/FileUploadHanlder.ts'
import { createMinistryHandler, updateMinistryHandler } from '../../scripts/handler/ministry/MinistryHandler.ts'
import type { Emitter } from 'mitt';

const props = defineProps({
  ministry: {
    type: Object,
    required: true,
  },
  showForm: {
    type: Boolean,
    required: true
  }
})

const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const { t } = useI18n()
const { toast } = useToast()

// Define Variable

const ministry = ref<MinistryModel>(JSON.parse(JSON.stringify(props.ministry)) as MinistryModel)
const showForm = ref<boolean>(props.showForm)
const previewImage = ref<string>('')
const _file = ref<File | null>(null);
const _fileChange = ref<boolean>(false);
const status = ref("New")

// Define props and emits
const emit = defineEmits(['update:open', 'updateForm', "closeForm"])

// Define methods
const onHandleSummitForm = async () => {
  try {
    if (_fileChange.value && _file.value) {
      try {
        const { data, statusCode } = await uploadFileHandler(_file.value);

        if (statusCode === 200 && data?.url) {
          ministry.value.en.imageUrl = data.url;
          ministry.value.kh.imageUrl = data.url;
        } else {
          throw new Error('File upload failed');
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }
    const action = status.value === "New" ? onHandleCreateMinistry : onHandleUpdateMinistry;
    await action();
  } catch (e) {
    console.log(e)
  }
}

const handleFileInput = (event: { target: { files: any[]; }; }) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    // member.value.image = reader.result
    const result = reader.result as string
    if (result) {
      previewImage.value = result
      _fileChange.value = true
      _file.value = file as File
    }
  }
  reader.readAsDataURL(file)
}

const onHandleUpdateMinistry = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { message, data, statusCode } = await updateMinistryHandler(ministry.value as MinistryModel);
    console.log(message, data, statusCode);
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('update_tag_success'),
        variant: 'success',
        title: t("success"),
      });
      emit('closeForm')
    }else{
      toast({ title: 'Something went wrong', description: 'The item has not been deleted.', variant: 'warning' });
    }
  } catch (e) {
    console.log(e)
  } finally {
    setTimeout(() => {
      emitter?.emit("stateLoading", false);
    }, 500);
  }
}

const onHandleCreateMinistry = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { message, data, statusCode } = await createMinistryHandler(ministry.value as MinistryModel);
    console.log(message, data, statusCode);
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('create_tag_success'),
        variant: 'success',
        title: t("success"),
      });
      emit('closeForm')
    }else{
      toast({ title: 'Something went wrong', description: 'The item has not been deleted.', variant: 'warning' });

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
  () => [props.ministry, props.showForm],
  () => {
    if (props.ministry && props.ministry._id && props.ministry._id) {
      ministry.value = createMinistry(JSON.parse(JSON.stringify(props.ministry)) as MinistryModel);
      status.value = "Update";
      previewImage.value = (ministry.value.en.imageUrl || ministry.value.kh.imageUrl) as string;
      if (previewImage.value && !previewImage.value.includes("https://")) {
        previewImage.value = "https://" + previewImage.value;
      }
    } else {
      ministry.value = createMinistry();
      status.value = "New";
      previewImage.value = "";
    }
    showForm.value = props.showForm
  }, { immediate: true, })
</script>
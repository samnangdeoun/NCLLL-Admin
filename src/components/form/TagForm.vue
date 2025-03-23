<template>
  <div>
    <Dialog v-model:open="showForm">
      <DialogContent class="sm:max-w-[625px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('tag') }}</DialogTitle>
          <DialogDescription>
            {{ $t('tag_form_desc') }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-2 py-4">
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('name') }}</Label>
                <Input v-model="tag.en.name" class="col-span-3" />
              </div>

              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('name_kh') }}</Label>
                <Input v-model="tag.kh.name" class="col-span-3" />
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
import type TagModel from '../../scripts/model/tag/TagModel.ts'
import { createTag } from '../../scripts/model/tag/TagModel.ts'
import { createTagHandler, updateTagHandler } from '../../scripts/handler/tag/TagHandler.ts'
import type { Emitter } from 'mitt';

const props = defineProps({
  tag: {
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
const tag = ref(props.tag)
const showForm = ref(props.showForm)
const status = ref("New")

// Define props and emits
const emit = defineEmits(['updateForm', "closeForm"])

// Define methods
const onHandleSummitForm = async () => {
  if(status.value == "New") onHandleCreateTag()
  else onHandleUpdateTag()
}

const onHandleUpdateTag = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { message, data, statusCode } = await updateTagHandler(tag.value as TagModel);
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
    }
  } catch (e) {
    console.log(e)
  } finally {
    setTimeout(() => {
      emitter?.emit("stateLoading", false);
    }, 500);
  }
}

const onHandleCreateTag = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { message, data, statusCode } = await createTagHandler(tag.value as TagModel);
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
  () => [props.tag, props.showForm],
  () => {
    if (props.tag && props.tag._id && props.tag._id) {
      tag.value = createTag(props.tag);
      status.value = "Update";
    } else {
      tag.value = createTag();
      status.value = "New";
    }
    showForm.value = props.showForm
  }, { immediate: true, })
</script>
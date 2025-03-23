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

<script setup>
import { ref, Text, watch } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '.././ui/dialog'
import { Button } from '.././ui/button'
import { Input } from '.././ui/input'
import { Textarea } from '.././ui/textarea'
import { Label } from '.././ui/label'

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

const banner = ref(props.banner)
const showForm = ref(props.showForm)
const status = ref("New")

// Define props and emits
const emit = defineEmits(['updateForm'])

// Define methods
const handleFileInput = (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    banner.value.imageUrl = reader.result
  }
  reader.readAsDataURL(file)
}

const onHandleSummitForm = () => {
  try {
    emit('updateForm', {
      ...banner.value,
      status: status.value
    })
    emit('closeForm')
  } catch (e) {
    console.log(e)
  }
}

// Define Watch
watch(props, () => {
  banner.value = props.banner
  showForm.value = props.showForm
  console.log(banner.value, ' banner')
  if (banner.value && banner.value._id && banner.value._id !== "") {
    status.value = "New"
  } else {
    status.value = "Update"
  }
})
</script>
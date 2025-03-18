<template>
  <div>
    <Dialog v-model:open="showForm">
      <DialogContent class="sm:max-w-[625px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('partner') }}</DialogTitle>
          <DialogDescription>
            {{ $t('partner_form_desc') }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4 py-4">
            <div>
              <!-- Name Field -->
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('name') }}</Label>
                <Input id="name" v-model="partner.name" class="col-span-3" placeholder="Partner Name" />
              </div>
              <!-- Description Field -->
              <div class="flex flex-col items-start justify-center">
                <Label for="description" class="text-left mb-1">{{ $t('description') }}</Label>
                <Textarea id="description" rows="6" v-model="partner.description" class="col-span-3"
                  placeholder="Enter description" />
              </div>
            </div>

            <div>
              <div class="flex flex-col items-start justify-center mb-3">
                <Label for="image" class="text-left mb-1">{{ $t('preview') }}</Label>
                <div class="h-[8.8rem] w-full border rounded-md">
                  <img v-if="partner.image" :src="partner.image" alt="Partner Logo"
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
import { ref, watch } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const props = defineProps({
  partner: {
    type: Object,
    required: true,
  },
  showForm: {
    type: Boolean,
    required: true
  }
})

console.log(props)

const partner = ref(props.partner)
const showForm = ref(props.showForm)
const status = ref("New")

// Define props and emits
const emit = defineEmits(['updateForm'])

// Define methods
const handleFileInput = (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    partner.value.image = reader.result
  }
  reader.readAsDataURL(file)
}

const onHandleSummitForm = () => {
  try {
    emit('updateForm', {
      ...partner.value,
      status: status.value
    })
    emit('closeForm')
  } catch (e) {
    console.log(e)
  }
}

// Define Watch
watch(props, () => {
  partner.value = props.partner
  showForm.value = props.showForm
  if (partner.value && partner.value.id == "") {
    status.value = "New"
  } else {
    status.value = "Update"
  }
})
</script>
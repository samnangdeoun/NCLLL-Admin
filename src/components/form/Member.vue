<template>
  <div>
    <Dialog v-model:open="showForm">
      <DialogContent class="sm:max-w-[725px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('member') }}</DialogTitle>
          <DialogDescription>
            {{ $t('member_form_desc') }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4 py-4">
            <div>
              <!-- Name Field -->
              <!-- <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('name') }}</Label>
                <Input id="name" v-model="member.name" class="col-span-3" placeholder="member Name" />
              </div> -->
              <!-- Description Field -->
              <!-- <div class="flex flex-col items-start justify-center">
                <Label for="description" class="text-left mb-1">{{ $t('description') }}</Label>
                <Textarea id="description" rows="6" v-model="member.description" class="col-span-3"
                  placeholder="Enter description" />
              </div> -->
            </div>

            <div>
              <!-- <div class="flex flex-col items-start justify-center mb-3">
                <Label for="image" class="text-left mb-1">{{ $t('preview') }}</Label>
                <div class="h-[8.8rem] w-full border rounded-md">
                  <img v-if="member.image" :src="member.image" alt="member Logo"
                    class="w-full h-full  object-cover bg-cover rounded-md">
                </div>
              </div> -->
              <!-- Image URL Field -->
              <div class="flex flex-col items-start justify-center mb-3">
                <Label for="position" class="text-left mb-1">{{ $t('position') }}</Label>
                <keep-alive>
                  <PositionSelection @positionChange="handlePositionChange" />
                </keep-alive>
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
import { ref, watch, defineAsyncComponent } from 'vue'
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

// Components
const PositionSelection = defineAsyncComponent(() => import('@/components/selection/Position.vue')) 

const props = defineProps({
  member: {
    type: Object,
    required: true,
  },
  showForm: {
    type: Boolean,
    required: true
  }
})

console.log(props)

const member = ref(props.member)
const showForm = ref(props.showForm)
const status = ref("New")

// Define props and emits
const emit = defineEmits(['updateForm'])

// Define methods
const handlePositionChange = (position) => {
  console.log(position, 'position')
}

const onHandleSummitForm = () => {
  try {
    emit('updateForm', {
      ...member.value,
      status: status.value
    })
    emit('closeForm')
  } catch (e) {
    console.log(e)
  }
}

// Define Watch
watch(props, () => {
  member.value = props.member
  showForm.value = props.showForm
  if (member.value && member.value.id == "") {
    status.value = "New"
  } else {
    status.value = "Update"
  }
})
</script>
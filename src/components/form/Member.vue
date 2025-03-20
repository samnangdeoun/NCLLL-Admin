<template>
  <div>
    <Dialog v-model:open="showForm">
      <DialogContent class="sm:max-w-[1024px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('member') }}</DialogTitle>
          <DialogDescription>
            {{ $t('member_form_desc') }}
          </DialogDescription>
        </DialogHeader>
        <Tabs default-value="account" class="w-full">
          <TabsList>
            <TabsTrigger value="KHMER">
              {{ $t('khmer') }}
            </TabsTrigger>
            <TabsTrigger value="ENGLISH">
              {{ $t('english') }}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="KHMER">
            <!-- KHMER FORM VERSION -->
            <form @submit.prevent="onHandleSummitForm" class="space-y-4">
              <div class="grid grid-cols-2 gap-4 py-4">
                <div>
                  <div>
                    <!-- Name Field -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('name') }}</Label>
                      <Input v-model="member.en.name" class="col-span-3" :placeholder="$t('name')" />
                    </div>
                    <!-- Description Field -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('email') }}</Label>
                      <Input rows="6" v-model="member.en.email" type="email" required
                        :rules="[validationRules.required, validationRules.email]" class="col-span-3"
                        :placeholder="$t('email')" />
                    </div>
                    <!-- Nationality Field -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('nationality') }}</Label>
                      <Input v-model="member.en.nationality" class="col-span-3" :placeholder="$t('nationality')" />
                    </div>
                    <!-- Date of Birth -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('birth_date') }}</Label>
                      <DatePicker v-model="member.en.birthDate" class="col-span-3" :placeholder="$t('birth_date')" />
                    </div>
                  </div>
                  <h1 class="mb-4 font-bold">{{ $t('place_of_birth') }}</h1>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="flex flex-col items-start justify-center ">
                      <Label class="text-left mb-1">{{ $t('house_number') }}</Label>
                      <Input v-model="member.en.placeOfBirth.houseNumber" class="col-span-3"
                        :placeholder="$t('house_number')" />
                    </div>
                    <div class="flex flex-col items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('street') }}</Label>
                      <Input v-model="member.en.placeOfBirth.street" class="col-span-3" :placeholder="$t('street')" />
                    </div>
                    <div class="flex flex-col col-span-2 items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('district') }}</Label>
                      <Input v-model="member.en.placeOfBirth.houseNumber" class="col-span-3"
                        :placeholder="$t('district')" />
                    </div>
                    <div class="flex flex-col items-start justify-center ">
                      <Label class="text-left mb-1">{{ $t('city') }}</Label>
                      <Input v-model="member.en.placeOfBirth.houseNumber" class="col-span-3"
                        :placeholder="$t('city')" />
                    </div>
                    <div class="flex flex-col items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('country') }}</Label>
                      <Input v-model="member.en.placeOfBirth.street" class="col-span-3" :placeholder="$t('country')" />
                    </div>
                  </div>
                </div>

                <div>
                  <!-- Position -->
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label class="text-left mb-1">{{ $t('position') }}</Label>
                    <keep-alive>
                      <PositionSelection :positionList="positionList" @positionChange="handlePositionChange" />
                    </keep-alive>
                  </div>
                  <!-- Preview -->
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label class="text-left mb-1">{{ $t('preview') }}</Label>
                    <div class="h-[8.8rem] w-full border rounded-md">
                      <img v-if="previewImage" :src="previewImage" alt="Partner Logo"
                        class="w-full h-full  object-cover bg-cover rounded-md">
                    </div>
                  </div>
                  <!-- Upload Image -->
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label class="text-left mb-1">{{ $t('upload_image') }}</Label>
                    <Input type="file" @onChange="handleFileInput" @input="handleFileInput" class="col-span-3"
                      accept="image/jpeg,image/png,image/gif" />
                  </div>
                  <!-- Description -->
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label class="text-left mb-1">{{ $t('description') }}</Label>
                    <Textarea rows="8" v-model="member.en.description" class="col-span-3" placeholder="Enter description" />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" @click="$emit('closeForm', false)">
                  Cancel
                </Button>
                <Button type="submit" variant="outline">{{ $t('save') }}</Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="ENGLISH">
            <!-- KHMER FORM VERSION -->
            ENGLIHS
          </TabsContent>
        </Tabs>


      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent, onMounted, inject } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from '../../components/ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

import { validationRules } from '../../utils/validationRule.ts'
import type { Emitter } from 'mitt';
import type Position from '../../scripts/model/position/Position.ts'
import { retrivePositionHandler } from '../../scripts/handler/position/Position.ts'
import { createMember } from '../../scripts/model/member/Member.ts'

// Components
const DatePicker = defineAsyncComponent(() => import('../../components/custom/DatePicker.vue'))
const PositionSelection = defineAsyncComponent(() => import('../../components/selection/Position.vue'))

// Define Props
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
const previewImage = ref('')
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const member = ref(createMember(props.member))
const showForm = ref(props.showForm)
const status = ref("New")
const positionList = ref<Position[]>([] as Position[])
console.log(member.value, 'member')
// Define props and emits
const emit = defineEmits(['updateForm', 'closeForm'])

// Define methods
const handlePositionChange = (position: Position) => {
  console.log(position, 'position')
}


const onLoadPosition = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { message, data, statusCode } = await retrivePositionHandler();
    console.log(message, data, statusCode);
    if (statusCode === 200) {
      positionList.value = (data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      emitter?.emit("stateLoading", false);
    }, 2000);
  }
};

const handleFileInput = (event: { target: { files: any[]; }; }) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    // member.value.image = reader.result
    const result = reader.result as string
    if (result) {
      previewImage.value = result
    }
  }
  reader.readAsDataURL(file)
}

const onHandleSummitForm = () => {
  try {
    emit('updateForm', {
      ...member.value,
      status: status.value
    })
    emit("closeForm", false)
  } catch (e) {
    console.log(e)
  }
}

// Define Lifecycle Hooks
onMounted(async () => {
  await onLoadPosition()
})

// Define Watch
watch(props, () => {
  if (props.member && props.member.id == "") {
    member.value = createMember(); 
    status.value = "New";
  } else {
    status.value = "Update";
    member.value = createMember(props.member); 
  }

  showForm.value = props.showForm
})
</script>
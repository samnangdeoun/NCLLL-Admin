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
             {{ member.position }}
            <form @submit.prevent="onHandleSummitForm" class="space-y-4">
              <div class="grid grid-cols-2 gap-4 py-4">
                <div>
                  <div>
                    <!-- Name Field -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('name') }}</Label>
                      <Input v-model="member.en.name" required class="col-span-3" :placeholder="$t('name')" />
                    </div>
                    <!-- Description Field -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('email') }}</Label>
                      <Input rows="6" v-model="member.en.email" type="email" required
                        :rules="[validationRules.required, validationRules.email]" class="col-span-3"
                        :placeholder="$t('email')" />
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <!-- Nationality Field -->
                      <div class="flex flex-col items-start justify-center mb-4">
                        <Label class="text-left mb-1">{{ $t('nationality') }}</Label>
                        <Input v-model="member.en.nationality" required class="col-span-3 "
                          :placeholder="$t('nationality')" />
                      </div>
                      <!-- Date of Birth -->
                      <div class="flex flex-col items-start justify-center mb-4">
                        <Label class="text-left mb-1">{{ $t('birth_date') }}</Label>
                        <DatePicker v-model="member.en.birthDate" class="col-span-3 w-full"
                          :placeholder="$t('birth_date')" />
                      </div>
                    </div>
                  </div>
                  <h1 class="mb-4 mt-3 font-bold">{{ $t('place_of_birth') }}</h1>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="flex flex-col items-start justify-center ">
                      <Label class="text-left mb-1">{{ $t('house_number') }}</Label>
                      <Input v-model="member.en.placeOfBirth.houseNumber" class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('street') }}</Label>
                      <Input v-model="member.en.placeOfBirth.street" class="col-span-3" />
                    </div>
                    <div class="flex flex-col col-span-2 items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('district') }}</Label>
                      <Input v-model="member.en.placeOfBirth.district" class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center ">
                      <Label class="text-left mb-1">{{ $t('city') }}</Label>
                      <Input v-model="member.en.placeOfBirth.city" class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('country') }}</Label>
                      <Input v-model="member.en.placeOfBirth.country" class="col-span-3" />
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
                  <div class="grid grid-cols-3 gap-2">
                    <!-- Preview -->
                    <div class="flex flex-col items-start justify-center mb-3 col-span-2">
                      <Label class="text-left mb-1">{{ $t('preview') }}</Label>
                      <div class="h-[8rem] w-full border rounded-md">
                        <img v-if="previewImage" :src="previewImage" alt="Partner Logo"
                          class="w-full h-full  object-cover bg-cover rounded-md">
                      </div>
                    </div>
                    <!-- Upload Image -->
                    <div class="flex justify-center items-end mb-3 col-span-1">
                      <Input type="file" @onChange="handleFileInput" @input="handleFileInput" class=" col-span-3"
                        accept="image/jpeg,image/png,image/gif" />
                    </div>
                  </div>

                  <div class="flex flex-col items-start justify-center mb-3 w-full">
                    <Label class="text-left mb-1">{{ $t('career_status') }}</Label>
                    <keep-alive>
                      <CareerStatus :cereerStatusList="member.en.careerStatus"
                        @careerChange="member.en.careerStatus = $event" />
                    </keep-alive>
                  </div>
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label class="text-left mb-1">{{ $t('experience') }}</Label>
                    <keep-alive>
                      <Experience :experienceList="member.en.experience"
                        @experienceChange="member.en.experience = $event" />
                    </keep-alive>
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

import { validationRules } from '../../utils/validationRule.ts'
import type { Emitter } from 'mitt';
import type Position from '../../scripts/model/position/Position.ts'
import { retrivePositionHandler } from '../../scripts/handler/position/Position.ts'
import { createMember } from '../../scripts/model/member/Member.ts'

// Components
const Experience = defineAsyncComponent(() => import('./member/Experience.vue'))
const CareerStatus = defineAsyncComponent(() => import('./member/CareerStatus.vue'))
const DatePicker = defineAsyncComponent(() => import('../custom/DatePicker.vue'))
const PositionSelection = defineAsyncComponent(() => import('../selection/Position.vue'))


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
  console.log(position, 'position -> her')
  if(position) {
    member.value.position = position
  }
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
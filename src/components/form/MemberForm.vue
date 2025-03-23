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
        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <Tabs default-value="KHMER" class="w-full">
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
              <div class="grid grid-cols-2 gap-4 py-4">
                <div>
                  <div>
                    <!-- Name Field -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('name_kh') }}</Label>
                      <Input v-model="member.kh.name" :rules="[validationRules.required]" required class="col-span-3" />
                    </div>
                    <!-- Description Field -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('email') }}</Label>
                      <Input @change="member.en.email = member.kh.email.toLowerCase()" v-model="member.kh.email"
                        type="email" required :rules="[validationRules.required, validationRules.email]"
                        class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <!-- Nationality Field -->
                      <div class="flex flex-col items-start justify-center mb-4">
                        <Label class="text-left mb-1">{{ $t('nationality_kh') }}</Label>
                        <Input v-model="member.kh.nationality" :rules="[validationRules.required]" required class="col-span-3 " />
                      </div>
                      <!-- Date of Birth -->
                      <div class="flex flex-col items-start justify-center mb-4">
                        <Label class="text-left mb-1">{{ $t('birth_date') }}</Label>
                        <DatePicker v-model="member.kh.birthDate" :initDate="member.kh.birthDate" @onDateChange="handleDateChange"
                          class="col-span-3 w-full" />
                      </div>
                    </div>
                  </div>
                  <h1 class="mb-4 mt-3 font-bold">{{ $t('place_of_birth') }}</h1>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="flex flex-col items-start justify-center ">
                      <Label class="text-left mb-1">{{ $t('house_number') }}</Label>
                      <Input v-model="member.kh.placeOfBirth.houseNumber" class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('street') }}</Label>
                      <Input v-model="member.kh.placeOfBirth.street" class="col-span-3" />
                    </div>
                    <div class="flex flex-col col-span-2 items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('district') }}</Label>
                      <Input v-model="member.kh.placeOfBirth.district" class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center ">
                      <Label class="text-left mb-1">{{ $t('city') }}</Label>
                      <Input v-model="member.kh.placeOfBirth.city" class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('country') }}</Label>
                      <Input v-model="member.kh.placeOfBirth.country" class="col-span-3" />
                    </div>
                  </div>
                </div>

                <div>
                  <!-- Position -->
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label class="text-left mb-1">{{ $t('position') }}</Label>
                    <keep-alive>
                      <PositionSelection :positionList="positionList" :initPosition="member.position"
                        @positionChange="handlePositionChange" />
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
                      <CareerStatus :showForm="showForm" :careerStatusList="member.kh.careerStatus"
                        @careerChange="member.kh.careerStatus = $event" />
                    </keep-alive>
                  </div>
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label class="text-left mb-1">{{ $t('experience') }}</Label>
                    <keep-alive>
                      <Experience :careerStatusList="member.en.careerStatus" :showForm="showForm"
                        :experienceList="member.kh.experience" @experienceChange="member.kh.experience = $event" />
                    </keep-alive>
                  </div>
                </div>
              </div>


            </TabsContent>
            <TabsContent value="ENGLISH">
              <!-- KHMER FORM VERSION -->
              <div class="grid grid-cols-2 gap-4 py-4">
                <div>
                  <div>
                    <!-- Name Field -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('name') }}</Label>
                      <Input v-model="member.en.name" :rules="[validationRules.required]" required class="col-span-3" />
                    </div>
                    <!-- Description Field -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('email') }}</Label>
                      <Input @change="member.kh.email = member.en.email.toLowerCase()" v-model="member.en.email"
                        type="email" required :rules="[validationRules.required, validationRules.email]"
                        class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <!-- Nationality Field -->
                      <div class="flex flex-col items-start justify-center mb-4">
                        <Label class="text-left mb-1">{{ $t('nationality') }}</Label>
                        <Input v-model="member.en.nationality" :rules="[validationRules.required]" required class="col-span-3 " />
                      </div>
                      <!-- Date of Birth -->
                      <div class="flex flex-col items-start justify-center mb-4">
                        <Label class="text-left mb-1">{{ $t('birth_date') }}</Label>
                        <DatePicker v-model="member.en.birthDate" :initDate="member.en.birthDate" required @onDateChange="handleDateChange"
                          class="col-span-3 w-full" />
                      </div>
                    </div>
                  </div>
                  <h1 class="mb-4 mt-3 font-bold">{{ $t('place_of_birth_kh') }}</h1>
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
                      <Input  v-model="member.en.placeOfBirth.country" class="col-span-3" />
                    </div>
                  </div>
                </div>

                <div>
                  <!-- Position -->
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label class="text-left mb-1">{{ $t('position') }}</Label>
                    <keep-alive>
                      <PositionSelection :positionList="positionList" :initPosition="member.position === '' ? undefined : member.position"
                        @positionChange="handlePositionChange" />
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
                      <Input type="file" required @onChange="handleFileInput" @input="handleFileInput" class=" col-span-3"
                        accept="image/jpeg,image/png,image/gif" />
                    </div>
                  </div>

                  <div class="flex flex-col items-start justify-center mb-3 w-full">
                    <Label class="text-left mb-1">{{ $t('career_status') }}</Label>
                    <keep-alive>
                      <CareerStatus :showForm="showForm" :careerStatusList="member.en.careerStatus"
                        @careerChange="member.en.careerStatus = $event" />
                    </keep-alive>
                  </div>
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label class="text-left mb-1">{{ $t('experience') }}</Label>
                    <keep-alive>
                      <Experience :careerStatusList="member.en.careerStatus" :showForm="showForm"
                        :experienceList="member.en.experience" @experienceChange="member.en.experience = $event" />
                    </keep-alive>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" @click="$emit('closeForm', false)">
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
import { ref, watch, defineAsyncComponent, onMounted, inject } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs/index.ts'
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
import { Label } from '../ui/label/index.ts'

import { validationRules } from '../../utils/validationRule.ts'
import type { Emitter } from 'mitt';
import type Position from '../../scripts/model/position/PositionModel.ts'
import { retrivePositionHandler, } from '../../scripts/handler/position/PositionHandler.ts'
import { createMember } from '../../scripts/model/member/MemberModel.ts'
import { createMemberHandler, updateMemberHandler } from '../../scripts/handler/member/MemberHandler.ts'
import { toast } from '../ui/toast/use-toast.ts'
import { useI18n } from 'vue-i18n'
import type MemberModel from '../../scripts/model/member/MemberModel.ts'

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

// Define Variable
const { t } = useI18n();
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
const handlePositionChange = (position: string) => {
  console.log(position, 'position -> her')
  if (position) {
    member.value.position = position
  }
}

const handleDateChange = (value: string) => {
  if (value) {
    member.value.en.birthDate = new Date(value)
    member.value.kh.birthDate = new Date(value)
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
      member.value.en.imageUrl = "https://picsum.photos/512/513"
      member.value.kh.imageUrl = "https://picsum.photos/512/513"
    }
  }
  reader.readAsDataURL(file)
}


const onHandleSummitForm = async () => {
  if (status.value == "New") onHandleCreateSponsor()
  else onHandleUpdateMember()
}

const onHandleUpdateMember = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { message, data, statusCode } = await updateMemberHandler(member.value as MemberModel);
    console.log(message, data, statusCode);
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('update_member_success'),
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

const onHandleCreateSponsor = async () => {
  try {
    emitter?.emit("stateLoading", true);
    member.value.en.imageUrl = "https://picsum.photos/512/513"
    member.value.kh = member.value.en
    const { message, data, statusCode } = await createMemberHandler(member.value as MemberModel);
    console.log(message, data, statusCode);
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('create_member_success'),
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

// Define Lifecycle Hooks
onMounted(async () => {
  await onLoadPosition()
})

watch(
  () => member.value.en.birthDate, 
  () => {
    if (member.value.en.birthDate) {
      member.value.kh.birthDate = member.value.en.birthDate
    }
  }
)

// Define Watch
watch(
  () => [props.member, props.showForm],
  () => {
    if (Object.keys(props.member).length == 0) {
      member.value = createMember();
      status.value = "New";
      previewImage.value = "";
    } else {
      status.value = "Update";
      member.value = createMember(props.member);
    }
    showForm.value = props.showForm
  }, { immediate: true, deep: true })
</script>

<template>
    <div class="w-full max-w-sm p-4 rounded-xl shadow-lg bg-white flex flex-col items-center">
        <h1 class="text-center font-bold text-sm">{{ partner.kh.name }}</h1>
        <div class="mt-3 w-full max-w-[40rem] max-h-[10rem] h-[10rem]">
            <img v-if="partner.logo" :src="partner.logo" alt="" class="w-full h-full object-cover rounded-lg">
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-center gap-2 mt-3 w-full">
            <button @click="emit('updatePartner', partner)"
                class="bg-white py-2 px-4 rounded-md text-green-600 flex items-center space-x-1 uppercase border border-green-600 hover:bg-green-100 transition">
                <Icon icon="mdi:square-edit-outline" width="20" height="20" />
                <span>{{ $t('edit') }}</span>
            </button>
            <button @click="emit('removePartner', partner)"
                class="bg-white py-2 px-4 rounded-md text-red-600 flex items-center space-x-1 uppercase border border-red-600 hover:bg-red-100 transition">
                <Icon icon="mdi:delete-outline" width="20" height="20" />
                <span>{{ $t('remove') }}</span>
            </button>
        </div>
    </div>
</template>


<script setup lang="ts">
// import 
import { Icon } from '@iconify/vue'
import { defineEmits, watch, ref } from 'vue'
import type PartnerModel from '../../scripts/model/partner/PartnerModel.ts'

// Define Emits
const emit = defineEmits(['updatePartner', 'removePartner'])


// Define Props
const props = defineProps<{
    partner: PartnerModel,
}>()


// Define Variable
const partner = ref<PartnerModel>(props.partner)

watch(
    () => [props.partner],
    () => {
        partner.value = props.partner 
    }, { immediate: true, deep: true },)
</script>

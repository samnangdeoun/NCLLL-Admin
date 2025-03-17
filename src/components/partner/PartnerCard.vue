<template>
    <div class="w-[20rem] h-[23em] p-4 rounded-xl shadow-lg bg-white flex flex-col items-center">
        <h1 class="text-center font-bold text-sm">{{ partner.name }}</h1>
        <div class="mb-1 mt-3 w-[15rem] h-[15rem]">
            <img :src="partner.image" alt="" class="w-full h-full">
        </div>
        <div class="flex flex-row justify-between items-end">
            <button @click="emit('updatePartner', partner)" class="bg-white py-1 px-4 rounded-md mt-3 text-green-600 flex space-x-1 uppercase">
                <Icon icon="mdi:square-edit-outline" width="24" height="24" />
                <span>{{ $t('edit') }}</span>
            </button>
            <button @click="emit('removePartner', partner)" class="bg-white  py-1 px-4 rounded-md mt-3 text-red-600 flex space-x-1 uppercase">
                <Icon icon="mdi:delete-outline" width="24" height="24" />
                <span>{{ $t('remove') }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
// import 
import { Icon } from '@iconify/vue'
import { defineEmits } from 'vue'

// Define Emits
const emit = defineEmits(['updatePartner', 'removePartner'])


// Define Props
const props = defineProps({
    partner: { type: Object, required: true },
})


// Define Variable
const { partner } = props
</script>
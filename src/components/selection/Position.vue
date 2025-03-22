<template>
    <Select v-model="selectedPosition" class="w-full">
        <SelectTrigger>
            <SelectValue :placeholder="$t('select_position')" />
        </SelectTrigger>
        <SelectContent class="bg-white">
            <SelectGroup>
                <SelectItem v-for="(position, index) in positionList" :key="index" :value="position">
                    {{ position.en.title }} - {{ position.kh.title }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>

<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'
import { ref, watch } from 'vue'
import type Position from '../../scripts/model/position/Position.ts'

// Define Props
defineProps({
    positionList: {
        type: Array as () => Position[],
        required: true,
    },
})

// Define Variables
const selectedPosition = ref<Position | null>(null)

// Emit event
const emit = defineEmits(['positionChange'])

// Watch for changes in selectedPosition and emit event
watch(selectedPosition, (newValue) => {
    console.log(newValue, 'selectedPosition')
    if (newValue) emit('positionChange', newValue)
})
</script>

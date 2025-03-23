<template>
    <Select v-model="selectedPosition" required class="w-full">
        <SelectTrigger>
            <SelectValue :value="selectedPosition" :placeholder="$t('select_position')" />
        </SelectTrigger>
        <SelectContent class="bg-white">
            <SelectGroup>
                <SelectItem v-for="(position, index) in positionList" :key="index" :value="position._id || ''">
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
import type Position from '../../scripts/model/position/PositionModel.ts'

// Define Props
const props = defineProps({
    positionList: {
        type: Array as () => Position[],
        required: true,
    },
    initPosition: {
        type: String,
        required: false,
        default: null
    },
})

// Define Variables
const selectedPosition = ref<string | null>(props.initPosition)

// Emit event
const emit = defineEmits(['positionChange'])

// Watch for changes in selectedPosition and emit event
watch(selectedPosition, (newValue: string | null) => {
    if (newValue) emit('positionChange', newValue)
})

// Watch for changes in initPosition and update selectedPosition accordingly
watch(() => props.initPosition, (newPosition: string | null) => {
    if (newPosition) {
        selectedPosition.value = newPosition
    }
}, { immediate: true })
</script>


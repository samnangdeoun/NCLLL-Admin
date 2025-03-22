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
const props = defineProps({
    positionList: {
        type: Array as () => Position[],
        required: true,
    },
    initPosition: {
        type: Object as () => Position | null,
        required: false,
        default: null
    },
})

// Define Variables
const selectedPosition = ref<Position | null>(props.initPosition)

// Emit event
const emit = defineEmits(['positionChange'])

// Watch for changes in selectedPosition and emit event
watch(selectedPosition, (newValue: Position | null) => {
    if (newValue) emit('positionChange', newValue)
})

// Watch for changes in initPosition and update selectedPosition accordingly
watch(() => props.initPosition, (newPosition: Position | null) => {
    console.log(newPosition, 'newPosition')
    if (newPosition) {
        selectedPosition.value = newPosition
    }
}, { immediate: true })
</script>

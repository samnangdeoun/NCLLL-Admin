<template>
    <Select class="w-full ">
        <SelectTrigger>
            <SelectValue :placeholder="$t('select_position')" />
        </SelectTrigger>
        <SelectContent class="bg-white">
            <SelectGroup>
                <SelectItem v-for="(position, index) in positionList" :key="index" :value="position"
                    @change="$emit('positionChange', position)">
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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { ref } from 'vue'
import type Position from '../../scripts/model/position/Position.ts'

// Define Props
const props = defineProps({
    positionList: {
        type: Object,
        required: true,
    },
})

// Define Variable
const positionList = ref<Position[]>(props.positionList as Position[])

// Emit event
defineEmits(['positionChange'])
</script>
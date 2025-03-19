<template>
    <Select class="w-full ">
        <SelectTrigger>
            <SelectValue :placeholder="$t('select_position')" />
        </SelectTrigger>
        <SelectContent class="bg-white">
            <SelectGroup>
                <SelectLabel>{{ $t('position') }}</SelectLabel>
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
import { onMounted, ref, inject } from 'vue';
import type Position from '../../scripts/model/position/Position.ts'
import { retrivePositionHandler } from '../../scripts/handler/position/Position.ts'
import type { Emitter } from 'mitt';

// Define Event
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');

// Define Variable
const positionList = ref<Position[]>([] as Position[])

// Define Function
const onLoadPosition = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { message, data, statusCode } = await retrivePositionHandler();
        console.log(message, data, statusCode);
        if (statusCode === 200) {
            positionList.value = data;
        }
    } catch (error) {
        console.error(error);
    } finally {
        setTimeout(() => {
            emitter?.emit("stateLoading", false);
        }, 1000);
    }
};

// Call function only once when the component is mounted
onMounted(() => {
    onLoadPosition();
});

// Emit event
defineEmits(['positionChange'])
</script>
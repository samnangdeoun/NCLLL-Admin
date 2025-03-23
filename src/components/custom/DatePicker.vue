<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="outline" :class="cn(
                'w-full justify-start text-left font-normal',
                !modelValue && 'text-muted-foreground',
            )">
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ formattedDate }}
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0 bg-white">
            <Calendar v-model="localValue"  initial-focus />
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-vue-next'
import { defineProps, defineEmits, computed } from 'vue'
import {
    DateFormatter,
    CalendarDate,
    type DateValue,
} from '@internationalized/date'

const df = new DateFormatter('en-US', { dateStyle: 'long' })

const props = defineProps<{ modelValue: Date | null | undefined, initDate: Date | null }>()
const emit = defineEmits(['update:modelValue', 'onDateChange'])

// Computed property to format the date for display
const formattedDate = computed(() => {
    if (!props.modelValue) return ""
    const date = props.modelValue instanceof Date
        ? new CalendarDate(props.modelValue.getFullYear(), props.modelValue.getMonth() + 1, props.modelValue.getDate())
        : undefined
    return date ? df.format(new Date(date.year, date.month - 1, date.day)) : ""
})

// Computed property for Calendar component binding
const localValue = computed<DateValue | undefined>({
    get: () => {
        if (!props.modelValue) return undefined
        if (props.modelValue instanceof Date) {
            return new CalendarDate(
                props.modelValue.getFullYear(),
                props.modelValue.getMonth() + 1,
                props.modelValue.getDate()
            )
        }
        return undefined
    },
    set: (newVal) => {
        if (newVal) {
            emit('onDateChange', new Date(newVal.year, newVal.month - 1, newVal.day))
            emit('update:modelValue', new Date(newVal.year, newVal.month - 1, newVal.day))
        } else {
            emit('update:modelValue', null)
        }
    }
})
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="outline" :class="cn(
                'w-full justify-start text-left font-normal',
                !modelValue && 'text-muted-foreground'
            )">
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ formattedDate }}
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0 bg-white">
            <Calendar v-model="localValue" initial-focus />
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { CalendarDate } from '@internationalized/date'

// Date Formatter

interface Props {
    modelValue?: Date | string | null
    initDate?: Date | string | null
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    initDate: null
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void
    (e: 'onDateChange', value: string | null): void
}>()

// Convert JavaScript Date or string to CalendarDate
const parsedModelValue = computed((): CalendarDate | null => {
    if (!props.modelValue) return null

    const dateToConvert = props.modelValue instanceof Date
        ? props.modelValue
        : new Date(props.modelValue)

    return new CalendarDate(
        dateToConvert.getFullYear(),
        dateToConvert.getMonth() + 1,
        dateToConvert.getDate()
    )
})

// Format date or return empty string
const formattedDate = computed((): string => {
    if (!parsedModelValue.value) return 'Select a date'

    return (new Date(
        parsedModelValue.value.year,
        parsedModelValue.value.month - 1,
        parsedModelValue.value.day
    ).toISOString().slice(0, 10))
})

// Reactive local value for v-model
const localValue = ref<CalendarDate | null>(parsedModelValue.value)

// Watch for changes and emit events
watch(localValue, (newVal) => {
    if (newVal) {
        const dateToEmit = new Date(
            newVal.year,
            newVal.month - 1,
            newVal.day
        ).toISOString().slice(0, 10)
        emit('update:modelValue', dateToEmit)
        emit('onDateChange', dateToEmit)
    } else {
        emit('update:modelValue', null)
        emit('onDateChange', null)
    }
})
</script>
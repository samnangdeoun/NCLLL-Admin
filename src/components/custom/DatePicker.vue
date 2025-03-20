<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="outline" :class="cn(
                'w-1/2 justify-start text-left font-normal',
                !value && 'text-muted-foreground',
            )">
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ value ? df.format(value.toDate(getLocalTimeZone())) : $t("pick_date") }}
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <Calendar v-model="value" initial-focus />
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
})

const value = ref<DateValue>()
</script>
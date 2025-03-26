<template>
    <Pagination class="flex justify-center items-center" v-slot="{ page }" :items-per-page="100" :total="100" :sibling-count="1" show-edges :default-page="1">
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst :disabled="page === 1" />
            <PaginationPrev />

            <template v-for="(item, index) in items">
                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                    <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                        {{ item.value }}
                    </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext />
            <PaginationLast />
        </PaginationList>
    </Pagination>
</template>

<script setup lang="ts">
import {
    Button,
} from '../ui/button'

import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '../ui/pagination'
</script>
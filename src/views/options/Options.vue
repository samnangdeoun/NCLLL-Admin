<template>
    <Tabs default-value="tag">
        <TabsList class="grid w-full grid-cols-2 ">
            <TabsTrigger value="tag">
                {{ $t('tag') }}
            </TabsTrigger>
            <TabsTrigger value="position">
                {{ $t('position') }}
            </TabsTrigger>
        </TabsList>
        <TabsContent value="tag">
            <Card class="p-2">
                <Tag></Tag>
            </Card>
        </TabsContent>
        <TabsContent value="position">
            <Card class="p-2">
                <Position></Position>
            </Card>
        </TabsContent>
    </Tabs>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs'

const Tag = defineAsyncComponent(() => import('@/views/tag/Tag.vue'));
const Position = defineAsyncComponent(() => import('@/views/member/position/Position.vue'));
</script>
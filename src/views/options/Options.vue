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
                <Tag :tagList="tags"></Tag>
            </Card>
        </TabsContent>
        <TabsContent value="position">
            <Card class="p-2">
                <Position :positionList="positions"></Position>
            </Card>
        </TabsContent>
    </Tabs>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, inject } from 'vue'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs'
import { retriveTagHandler } from '@/scripts/handler/tag/TagHandler.ts';
import { retrivePositionHandler } from '@/scripts/handler/position/PositionHandler.ts';
import type { Emitter } from 'mitt';

const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const Tag = defineAsyncComponent(() => import('@/views/tag/Tag.vue'));
const Position = defineAsyncComponent(() => import('@/views/member/position/Position.vue'));
const tags = ref([]);
const positions = ref([]);

//Function

const onLoadPosition = async () => {
    // Define Function
    try {
        emitter?.emit("stateLoading", true);
        const { message, data, statusCode } = await retrivePositionHandler()
        console.log(message, data, statusCode);
        if (statusCode == 200) {
            positions.value = data;
        }
    } catch (error) {
        console.error(error);
    } finally {
        emitter?.emit("stateLoading", false);
    }
};

const onLoadTags = async () => {
    // Define Function
    try {
        emitter?.emit("stateLoading", true);
        const { message, data, statusCode } = await retriveTagHandler()
        console.log(message, data, statusCode);
        if (statusCode == 200) {
            tags.value = data
        }
    } catch (error) {
        console.error(error);
    } finally {
        emitter?.emit("stateLoading", false);
    }
};

onMounted(async () => {
    await onLoadTags();
    await onLoadPosition();
});
</script>
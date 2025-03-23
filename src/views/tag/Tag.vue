<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateTag">
                {{ $t('new') }}
            </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-auto scrollbar-hide">
            <TagCard v-for="(tag, index) in tags" :key="index" :tag="tag" @updateTag="handleUpdateTag"
                @removeTag="handleRemoveTag" />
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

        <TagForm :showForm="showTagForm" @closeForm="showTagForm = false" :tag="selectedTag"
            @updateForm="handleUpdateForm" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, inject } from 'vue';
import { useToast } from '../../components/ui/toast/use-toast.ts';
import type TagModel from '../../scripts/model/tag/TagModel.ts';
import type { Emitter } from 'mitt';
import { retriveTagHandler, removeTagHandler } from '../../scripts/handler/tag/TagHandler.ts';

const TagForm = defineAsyncComponent(() => import('../../components/form/TagForm.vue'));
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));
const TagCard = defineAsyncComponent(() => import('../../components/cards/TagCard.vue'));

const { toast } = useToast();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const tags = ref<TagModel[]>([]);
const showConfirmDialog = ref(false);
const showTagForm = ref(false);
const selectedTag = ref<TagModel>({} as TagModel);

const handleUpdateTag = (tag: any) => {
    if (tag?._id) {
        selectedTag.value = tag;
        showTagForm.value = true;
    }
};

const onCreateTag = () => {
    selectedTag.value = {} as TagModel;
    showTagForm.value = true;
};

const handleUpdateForm = (tag: any) => {
    console.log(tag, ' handleUpdateForm');
    if (tag && tag.status == 'New') {
        tags.value.push(tag);
    } else {
        const index = tags.value.findIndex(p => p._id == tag._id);
        if (index !== -1) {
            console.log((tag) as TagModel, 'tag');
            tags.value[index] = (tag) as TagModel;
            console.log(tags.value, 'tags.value');
        }
    }
};

const handleRemoveTag = (tag: TagModel) => {
    console.log(tag, 'handleRemoveTag');
    if (tag?._id) {
        selectedTag.value = tag;
        showConfirmDialog.value = true;
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
        setTimeout(() => {
            emitter?.emit("stateLoading", false);
        }, 1000);
    }
};

const handleConfirm = async () => {
    try{
        emitter?.emit("stateLoading", true);
        const { statusCode } = await removeTagHandler(selectedTag.value as TagModel);
        console.log( statusCode);
        if (statusCode == 200) {
            tags.value = tags.value.filter(p => p._id !== selectedTag?.value?._id);
            toast({ title: 'Item Deleted', description: 'The item has been deleted.', variant: 'success' });
        }
    }catch(error){
        console.error(error);
    }finally{
        setTimeout(() => {
            emitter?.emit("stateLoading", false);
        }, 1000);
    }
};

const handleCancel = () => {
    toast({ title: 'Item Not Deleted', description: 'The item has not been deleted.', variant: 'warning' });
};

onMounted(async () => {
    await onLoadTags();
});
</script>

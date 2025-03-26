<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateResource">
                {{ $t('new') }}
            </button>
        </div>

        <div class="overflow-x-auto scrollbar-hide">
            <Table class="w-full bg-white">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[100px]">
                            {{ $t('no') }}
                        </TableHead>
                        <TableHead>{{ $t('cover') }}</TableHead>
                        <TableHead class="w-[25%]">{{ $t('title') }}</TableHead>
                        <TableHead class="w-[25%]">{{ $t('source') }}</TableHead>
                        <TableHead class="w-[20%]">{{ $t('publish_date') }}</TableHead>
                        <TableHead class="text-right">
                            {{ $t('action') }}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(resource, index) in resourceList" :key="index">
                        <TableCell class="font-medium">
                            {{ index + 1 }}
                        </TableCell>
                        <TableCell>
                            <div class="flex justify-center items-center border rounded-md w-[6rem] h-[8rem]">
                                <img v-if="resource.cover" :src="resource.cover"
                                    class="w-full h-full object-cover rounded-md" />
                            </div>
                        </TableCell>
                        <TableCell>{{ resource.title }}</TableCell>
                        <TableCell>{{ resource.source.kh.name }} ({{ resource.source.en.name }})</TableCell>
                        <TableCell>{{ conversionUTCDate(resource.publishedAt) }}</TableCell>
                        <TableCell class=" flex justify-end gap-2">
                            <button class="bg-green-600 rounded-md px-5 py-2" @click="onUpdateResource(resource)">
                                {{ $t('update') }}
                            </button>
                            <button class="bg-red-600 rounded-md px-5 py-2" @click="handleRemoveResource(resource)">
                                {{ $t('remove') }}
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <CustomPagination></CustomPagination>
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

        <ResourceForm v-model:open="showResourceForm" :showForm="showResourceForm"
            @closeForm="showResourceForm = $event" :resource="selectedResource" @updateForm="handleUpdateForm" />
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, inject, defineAsyncComponent } from 'vue';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table'

import { conversionUTCDate } from '../../utils/conversionDate.ts'
import type ResourceModel from '../../scripts/model/resource/ResourceModel.ts'
import { retriveResourceHandler, removeResourceHandler } from '../../scripts/handler/resource/ResourceHandler.ts'
import type { Emitter } from 'mitt';
import { toast } from '../../components/ui/toast/use-toast.ts';

// Define Component
const ResourceForm = defineAsyncComponent({
    loader: () => import('../../components/form/ResourceForm.vue'),
    loadingComponent: { template: '<div>Loading...</div>' },
    delay: 300,
    timeout: 3000
})
const CustomPagination = defineAsyncComponent({
    loader: () => import('../../components/custom/Pagination.vue'),
    loadingComponent: { template: '<div>Loading...</div>' },
    delay: 300,
    timeout: 3000
})
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));

// Define Event
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');

// Define Varible
const showConfirmDialog = ref(false);
const resourceList = ref<ResourceModel[]>([] as ResourceModel[])
const showResourceForm = ref<boolean>(false)
const selectedResource = ref<ResourceModel>({} as ResourceModel)
const paginate = ref<any>({})


// Define Function
const onLoadResource = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { message, data, statusCode } = await retriveResourceHandler()
        console.log(message, data, statusCode);
        if (statusCode == 200) {
            paginate.value = data.meta;
            resourceList.value = data.results
        }
    } catch (error) {
        console.error(error);
    } finally {
        setTimeout(() => {
            emitter?.emit("stateLoading", false);
        }, 1000);
    }
}

const handleRemoveResource = (resource: ResourceModel) => {
    if (resource?._id) {
        selectedResource.value = resource;
        showConfirmDialog.value = true;
    }
};

const handleConfirm = async () => {
    try {
        emitter?.emit("stateLoading", true);
        console.log(selectedResource.value, '-> valuue');
        const { statusCode } = await removeResourceHandler(selectedResource.value as ResourceModel);
        console.log(statusCode);
        if (statusCode == 200) {
            resourceList.value = resourceList.value.filter(p => p._id !== selectedResource?.value?._id);
            toast({ title: 'Item Deleted', description: 'The item has been deleted.', variant: 'success' });
        }
    } catch (error) {
        console.error(error);
    } finally {
        setTimeout(() => {
            emitter?.emit("stateLoading", false);
        }, 1000);
    }
};

const handleCancel = () => {
    toast({ title: 'Item Not Deleted', description: 'The item has not been deleted.', variant: 'warning' });
};

const onCreateResource = () => {
    selectedResource.value = {} as ResourceModel
    showResourceForm.value = true
}

const onUpdateResource = (resource: ResourceModel) => {
    selectedResource.value = resource as ResourceModel
    showResourceForm.value = true
}

const handleUpdateForm = (resource: any) => {
    try {
        if (resource && resource.status == 'New') {
            resourceList.value.push(resource as ResourceModel);
        } else {
            resource
            const index = resourceList.value.findIndex(p => p._id === resource._id);
            if (index !== -1) {
                resourceList.value[index] = (resource) as ResourceModel;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

onMounted(async () => {
    try {
        await onLoadResource()
    } catch (err) {
        console.error(err)
    }
})

</script>
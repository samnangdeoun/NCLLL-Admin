<template>
    <div class="h-full w-full overflow-auto relative">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateBlog">
                {{ $t('new') }}
            </button>
        </div>

        <div class="w-full bg-white h-[75vh] overflow-auto">
            <Table class="w-full bg-white">
                <TableHeader>
                    <TableRow class="w-full">
                        <TableHead class="w-[5%]">{{ $t('no') }}</TableHead>
                        <TableHead class="w-[20%]">{{ $t('name') }}</TableHead>
                        <TableHead class="w-[20%]">{{ $t('name_kh') }}</TableHead>
                        <TableHead class="w-[30%]">{{ $t('description') }}</TableHead>
                        <TableHead class="w-[10%]">{{ $t('status') }}</TableHead>
                        <TableHead class="w-[15%] text-right">{{ $t('action') }}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(news, index) in newsList" :key="index">
                        <TableCell class="font-medium">
                            {{ index + 1 }}
                        </TableCell>
                        <TableCell>
                            {{ news?.en?.title }}
                        </TableCell>
                        <TableCell>
                            {{ news?.kh?.title }}
                        </TableCell>
                        <TableCell>
                            {{ news.en.description }}
                        </TableCell>
                        <TableCell>
                            {{ news?.status }}
                        </TableCell>
                        <TableCell class=" flex justify-end gap-2">
                            <button class="bg-green-600 rounded-md px-5 py-2" @click="onUpdateNews(news)">
                                {{ $t('update') }}
                            </button>
                            <button class="bg-red-600 rounded-md px-5 py-2" @click="handleRemoveMember(news)">
                                {{ $t('remove') }}
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <div
            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white py-2 shadow-md flex justify-center">
            <CustomPagination v-model:meta="paginate" @pageChange="onPaginateChange">
            </CustomPagination>
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, inject, defineAsyncComponent } from 'vue';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table'
import { useRouter } from 'vue-router';
import type BlogModel from '../../scripts/model/blog/BlogModel.ts'
import { retriveBlogHandler, removeBlogHandler } from '../../scripts/handler/blog/BlogHandler.ts'
import type { Emitter } from 'mitt';
import { toast } from '../../components/ui/toast/use-toast.ts';

// Define Component
const CustomPagination = defineAsyncComponent({
    loader: () => import('@/components/custom/Pagination.vue'),
    loadingComponent: { template: '<div>Loading...</div>' },
    delay: 300,
    timeout: 3000
})
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));

// Define Event
const router = useRouter();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');

// Define Varible
const paginate = ref<any>({})
const currentPage = ref<number>(1)
const showConfirmDialog = ref(false);
const newsList = ref<BlogModel[]>([] as BlogModel[])
const selectedNews = ref<BlogModel>({} as BlogModel)


// Define Function
const onLoadNews = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { message, data, statusCode } = await retriveBlogHandler(
            {
                limit: 5,
                page: currentPage.value
            }
        )
        console.log(message, data, statusCode);
        if (statusCode == 200) {
            newsList.value = data.results
        }
    } catch (error) {
        console.error(error);
    } finally {
            emitter?.emit("stateLoading", false);
    }
}

const onPaginateChange = async (page: number) => {
    if (!isNaN(page)) {
        currentPage.value = page
        await onLoadNews()
    }
}


const handleRemoveMember = (news: BlogModel) => {
    if (news?._id) {
        selectedNews.value = news;
        showConfirmDialog.value = true;
    }
};

const handleConfirm = async () => {
    try {
        emitter?.emit("stateLoading", true);
        console.log(selectedNews.value, '-> valuue');
        const { statusCode } = await removeBlogHandler(selectedNews.value as BlogModel);
        console.log(statusCode);
        if (statusCode == 200) {
            newsList.value = newsList.value.filter(p => p._id !== selectedNews?.value?._id);
            toast({ title: 'Item Deleted', description: 'The item has been deleted.', variant: 'success' });
        }
    } catch (error) {
        console.error(error);
    } finally {
            emitter?.emit("stateLoading", false);
    }
};

const handleCancel = () => {
    toast({ title: 'Item Not Deleted', description: 'The item has not been deleted.', variant: 'warning' });
};

const onCreateBlog = () => {
    router.push({
        name: 'Content',
        query: {
            status: 'new',
            id: ""
        },
    })
}

const onUpdateNews = (news: BlogModel) => {
    selectedNews.value = news as BlogModel
    router.push({
        name: 'Content',
        query: {
            status: 'update',
            id: selectedNews.value._id,
            source: "News"
        },
    })
}

// const handleUpdateForm = (news: any) => {
//     try {
//         if (news && news.status == 'New') {
//             newsList.value.push(news as BlogModel);
//         } else {
//             news
//             const index = newsList.value.findIndex(p => p._id === news._id);
//             if (index !== -1) {
//                 newsList.value[index] = (news) as BlogModel;
//             }
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

onMounted(async () => {
    await onLoadNews()
})

</script>
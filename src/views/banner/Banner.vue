<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateBanner">
                {{ $t('new') }}
            </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-auto scrollbar-hide">
            <BannerCard v-for="(banner, index) in banners" :key="index" :banner="banner" @updateBanner="handleUpdateBanner"
                @removeBanner="handleRemoveBanner" />
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

        <BannerForm v-model:open="showBannerForm" :showForm="showBannerForm" @closeForm="showBannerForm = false" :banner="selectedBanner"
            @updateForm="handleUpdateForm" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, inject } from 'vue';
import { useToast } from '../../components/ui/toast/use-toast';
import type BannerModel from '../../scripts/model/banner/BannerModel.ts';
import type { Emitter } from 'mitt';
import { retriveBannerHandler, removeBannerHandler } from '../../scripts/handler/banner/BannerHandler.ts';

const BannerForm = defineAsyncComponent(() => import('../../components/form/BannerForm.vue'));
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));
const BannerCard = defineAsyncComponent(() => import('../../components/cards/BannerCard.vue'));

const { toast } = useToast();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const banners = ref<BannerModel[]>([]);
const showConfirmDialog = ref(false);
const showBannerForm = ref(false);
const selectedBanner = ref<BannerModel>({} as BannerModel);

const handleUpdateBanner = (banner: any) => {
    if (banner?._id) {
        selectedBanner.value = banner;
        showBannerForm.value = true;
    }
};

const onCreateBanner = () => {
    selectedBanner.value = {} as BannerModel;
    showBannerForm.value = true;
};

const handleUpdateForm = (banner: any) => {
    if (banner && banner.status == 'New') {
        banners.value.push(banner);
    } else {
        const index = banners.value.findIndex(p => p._id == banner._id);
        if (index !== -1) {
            banners.value[index] = (banner) as BannerModel;
        }
    }
};

const handleRemoveBanner = (banner: BannerModel) => {
    if (banner?._id) {
        selectedBanner.value = banner;
        showConfirmDialog.value = true;
    }
};

const onLoadBanners = async () => {
    // Define Function
    try {
        emitter?.emit("stateLoading", true);
        const { message, data, statusCode } = await retriveBannerHandler()
        console.log(message, data, statusCode);
        if (statusCode == 200) {
            banners.value = data
        }
    } catch (error) {
        console.error(error);
    } finally {
            emitter?.emit("stateLoading", false);
    }
};

const handleConfirm = async () => {
    try{
        emitter?.emit("stateLoading", true);
        const { statusCode } = await removeBannerHandler(selectedBanner.value as BannerModel);
        console.log( statusCode);
        if (statusCode == 200) {
            banners.value = banners.value.filter(p => p._id !== selectedBanner?.value?._id);
            toast({ title: 'Item Deleted', description: 'The item has been deleted.', variant: 'success' });
        }
    }catch(error){
        console.error(error);
    }finally{
            emitter?.emit("stateLoading", false);
    }
};

const handleCancel = () => {
    toast({ title: 'Item Not Deleted', description: 'The item has not been deleted.', variant: 'warning' });
};

onMounted(async () => {
   await onLoadBanners();
});
</script>

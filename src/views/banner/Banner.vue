<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreatePartner">
                {{ $t('new') }}
            </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-auto scrollbar-hide">
            <BannerCard v-for="banner in banners" :key="banner.id" :banner="banner" @updatePartner="handleUpdateBanner"
                @removePartner="handleRemoveBanner" />
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

        <BannerForm :showForm="showPartnerForm" @closeForm="showPartnerForm = false" :banner="selectedBanner"
            @updateForm="handleUpdateForm" />
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
import { useToast } from '../../components/ui/toast/use-toast';
import Banner from '../../scripts/model/banner/BannerModel.ts';
import { retriveBannerHandler } from '../../scripts/handler/banner/Banner.ts';

const BannerForm = defineAsyncComponent(() => import('../../components/form/BannerForm.vue'));
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));
const BannerCard = defineAsyncComponent(() => import('../../components/banner/BannerCard.vue'));

const { toast } = useToast();
const banners = ref(partnerInfo.banners);
const showConfirmDialog = ref(false);
const showPartnerForm = ref(false);
const selectedBanner = ref(null);

const handleUpdateBanner = (banner) => {
    if (banner?.id) {
        selectedBanner.value = new banner(banner);
        showPartnerForm.value = true;
    }
};

const onCreatePartner = () => {
    selectedBanner.value = new banner({});
    showPartnerForm.value = true;
};

const handleUpdateForm = (banner) => {
    console.log(banner, ' handleUpdateForm');
    if (banner && banner.status == 'New') {
        banners.value.push(banner);
    } else {
        const index = banners.value.findIndex(p => p.id === banner.id);
        if (index !== -1) {
            banners.value[index] = new banner(banner);
        }
    }
};

const handleRemoveBanner = (banner) => {
    if (banner?.id) {
        selectedBanner.value = new banner(banner);
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
            memberList.value = data
        }
    } catch (error) {
        console.error(error);
    } finally {
        setTimeout(() => {
            emitter?.emit("stateLoading", false);
        }, 1000);
    }
};

const handleConfirm = () => {
    banners.value = banners.value.filter(p => p.id !== selectedBanner.value.id);
    toast({ title: 'Item Deleted', description: 'The item has been deleted.', variant: 'success' });
};

const handleCancel = () => {
    toast({ title: 'Item Not Deleted', description: 'The item has not been deleted.', variant: 'warning' });
};
</script>

<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateBanner">
                {{ $t('new') }}
            </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-auto scrollbar-hide">
            <PartnerCard v-for="(partner, index) in partnerList" :key="index" :partner="partner"
                @updatePartner="handleUpdatePartner" @removePartner="handleRemovePartner" />
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

        <PartnerForm v-model:open="showPartnerForm" :showForm="showPartnerForm" @closeForm="showPartnerForm = false"
            :partner="selectedPartner" @updateForm="handleUpdateForm" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, inject } from 'vue';
import { useToast } from '../../components/ui/toast/use-toast.ts';
import type PartnerModel from '@/scripts/model/partner/PartnerModel.ts';
import type { Emitter } from 'mitt';
import { retrivePartnerHandler, removePartnerHandler } from '@/scripts/handler/partner/PartnerHandler.ts';

const ConfirmDialog = defineAsyncComponent(() => import('@/components/custom/ConfirmDialog.vue'));
const PartnerCard = defineAsyncComponent(() => import('@/components/cards/PartnerCard.vue'));
const PartnerForm = defineAsyncComponent(() => import('@/components/form/PartnerForm.vue'));

const { toast } = useToast();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const partnerList = ref<PartnerModel[]>([] as PartnerModel[]);
const showConfirmDialog = ref(false);
const showPartnerForm = ref(false);
const selectedPartner = ref<PartnerModel>({} as PartnerModel);

const handleUpdatePartner = (partner: any) => {
    if (partner?._id) {
        selectedPartner.value = partner;
        showPartnerForm.value = true;
    }
};

const onCreateBanner = () => {
    selectedPartner.value = {} as PartnerModel;
    showPartnerForm.value = true;
};

const handleUpdateForm = (partner: any) => {
    if (partner && partner.status == 'New') {
        partnerList.value.push(partner as PartnerModel);
    } else {
        const index = partnerList.value.findIndex(p => p._id == partner._id);
        if (index !== -1) {
            partnerList.value[index] = (partner) as PartnerModel;
        }
    }
};

const handleRemovePartner = (partner: PartnerModel) => {
    if (partner?._id) {
        selectedPartner.value = partner;
        showConfirmDialog.value = true;
    }
};

const onLoadPartners = async () => {
    // Define Function
    try {
        emitter?.emit("stateLoading", true);
        const { data, statusCode } = await retrivePartnerHandler()
        if (statusCode == 200) {
            console.log(data, " -> Parnter Lisit");
            partnerList.value = data.results;
        }
    } catch (error) {
        console.error(error);
    } finally {
        emitter?.emit("stateLoading", false);
    }
};

const handleConfirm = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { statusCode } = await removePartnerHandler(selectedPartner.value as PartnerModel);
        console.log(statusCode);
        if (statusCode == 200) {
            partnerList.value = partnerList.value.filter(p => p._id !== selectedPartner?.value?._id);
            toast({ title: 'Item Deleted', description: 'The item has been deleted.', variant: 'success' });
        } else {
            toast({ title: 'Something went wrong', description: 'The item has not been deleted.', variant: 'warning' });
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

onMounted(async () => {
    await onLoadPartners();
});
</script>

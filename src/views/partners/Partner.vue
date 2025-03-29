<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreatePartner">
                {{ $t('new') }}
            </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-2 overflow-x-auto scrollbar-hide">
            <PartnerCard v-for="partner in partners" :key="partner.id" :partner="partner"
                @updatePartner="handleUpdatePartner" @removePartner="handleRemovePartner" />
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

        <PartnerForm v-model:open="showPartnerForm" :showForm="showPartnerForm" @closeForm="showPartnerForm = false" :partner="selectedPartner"
            @updateForm="handleUpdateForm" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, inject, onMounted } from 'vue';
import { useToast } from '../../components/ui/toast/use-toast';
import type Partner from '@/scripts/model/partner/PartnerModel.ts';

import { retrivePartnerHandler, removePartnerHandler } from '@/scripts/handler/partner/PartnerHandler.ts'
import type { Emitter } from 'mitt';

const PartnerForm = defineAsyncComponent(() => import('../.././components/form/PartnerForm.vue'));
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));
const PartnerCard = defineAsyncComponent(() => import('../../components/cards/PartnerCard.vue'));


// Define Event
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const { toast } = useToast();
const partners = ref<Partner[]>([]);
const showConfirmDialog = ref<boolean>(false);
const showPartnerForm = ref<boolean>(false);
const selectedPartner = ref<Partner>({} as Partner);



// Define Function
const onLoadPartners = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { message, data, statusCode } = await retrivePartnerHandler()
        console.log(message, data, statusCode);
        if (statusCode == 200) {
            partners.value = data.results
        }
    } catch (error) {
        console.error(error);
    } finally {
        setTimeout(() => {
            emitter?.emit("stateLoading", false);
        }, 1000);
    }
}

const handleUpdatePartner = (partner: any) => {
    if (partner?.id) {
        selectedPartner.value = (partner) as Partner;
        showPartnerForm.value = true;
    }
};

const onCreatePartner = () => {
    selectedPartner.value = {} as Partner;
    showPartnerForm.value = true;
};

const handleUpdateForm = (partner: any) => {
    console.log(partner, ' handleUpdateForm');
    if(partner && partner.status == 'New') {
        partners.value.push(partner);
    }else{
        const index = partners.value.findIndex(p => p.id === partner.id);
        if (index !== -1) {
            partners.value[index] = (partner) as Partner;
        }
    }
};

const handleRemovePartner = (partner: any) => {
    if (partner?.id) {
        selectedPartner.value = (partner) as Partner;
        showConfirmDialog.value = true;
    }
};

const handleConfirm = () => {
    partners.value = partners.value.filter(p => p.id !== selectedPartner.value.id);
    toast({ title: 'Item Deleted', description: 'The item has been deleted.', variant: 'success' });
};

const handleCancel = () => {
    toast({ title: 'Item Not Deleted', description: 'The item has not been deleted.', variant: 'warning' });
};


onMounted(async () => {
    await onLoadPartners();
});
</script>

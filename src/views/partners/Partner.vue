<template>
    <div class="h-full w-full overflow-auto">
        <div class="grid grid-cols-3 gap-4 overflow-hidden scrollbar-hide">
            <PartnerCard v-for="partner in partners" @updatePartner="hanldeUpdatePartner"
                @removePartner="handleRemovePartner" :key="partner.id" :partner="partner" />
        </div>

        <!-- Confirm Dialog -->
        <div>
            <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
                description="Are you sure you want to delete this item? This action cannot be undone."
                confirm-text="Delete" cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />
        </div>

        <!-- Partner Form -->
        <PartnerForm v-model:open="showPartnerForm" :initialData="assignPartner" @update="handleUpdate"
            @close="handleClose" />
    </div>
</template>


<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { useToast } from '../../components/ui/toast/use-toast';

// Define Components
const PartnerForm = defineAsyncComponent(() => import('../../components/form/Partner.vue'));
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));
const PartnerCard = defineAsyncComponent(() => import('../../components/partner/PartnerCard.vue'));

// Fake INfo
import partnerInfo from '../../fake-information/partners.json'

// Define Variables
const { toast } = useToast();
const partners = ref(partnerInfo.partners)
const showConfirmDialog = ref(false)
const showPartnerForm = ref(false)
const assignPartner = ref(null)


// Define Functions
const hanldeUpdatePartner = (partner) => {
    console.log(partner, '-> updatePartner')
    if (partner && partner.id) {
        assignPartner.value = partner;
        showPartnerForm.value = true
    }
}

const handleRemovePartner = (partner) => {
    console.log(partner, '-> removePartner')
    if (partner && partner.id) {
        showConfirmDialog.value = true
    }
}

const handleConfirm = () => {
    toast({
        title: 'Item Deleted',
        description: 'The item has been deleted.',
        variant: 'success',
    })
}

const handleCancel = () => {
    toast({
        title: 'Item Not Deleted',
        description: 'The item has not been deleted.',
        variant: 'warning',
    })
}

</script>
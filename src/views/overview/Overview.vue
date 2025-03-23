<template>
    <div>
        <h1>Overview</h1>
        <PartnerForm/>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const PartnerForm = defineAsyncComponent(() => import('../../components/form/PartnerForm.vue'))
</script>
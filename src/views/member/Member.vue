<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateMember">
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
                        <TableHead>{{ $t('name') }}</TableHead>
                        <TableHead>{{ $t('name_kh') }}</TableHead>
                        <TableHead>{{ $t('position') }}</TableHead>
                        <TableHead class="text-right">
                            {{ $t('action') }}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(MemberModel, index) in memberList" :key="index">
                        <TableCell class="font-medium">
                            {{ index + 1 }}
                        </TableCell>
                        <TableCell>{{ MemberModel.en.name }}</TableCell>
                        <TableCell>{{ MemberModel.kh.name }}</TableCell>
                        <TableCell>{{ MemberModel.position.en.title }} {{ MemberModel.position.kh.title }}</TableCell>
                        <TableCell class="text-right">
                            <button class="bg-green-600 rounded-md px-5 py-2" @click="onUpdateMember(MemberModel)">
                                {{ $t('update') }}
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <!-- <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" /> -->

        <MemberForm :showForm="showMemberForm" @closeForm="showMemberForm = $event" :member="selectedMember"
            @updateForm="handleUpdateForm" />
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

import type MemberModel from '../../scripts/model/member/MemberModel.ts'
import { retriveMemberHandler } from '../../scripts/handler/member/MemberHandler.ts'

import type { Emitter } from 'mitt';

// Define Component
const MemberForm = defineAsyncComponent({
    loader: () => import('../../components/form/MemberForm.vue'),
    loadingComponent: { template: '<div>Loading...</div>' },
    delay: 300,
    timeout: 3000
})

// Define Event
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');

// Define Varible
const memberList = ref<MemberModel[]>([] as MemberModel[])
const showMemberForm = ref<boolean>(false)
const selectedMember = ref<MemberModel>({} as MemberModel)


// Define Function
const onLoadMember = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { message, data, statusCode } = await retriveMemberHandler()
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
}


const onCreateMember = () => {
    selectedMember.value = {} as MemberModel
    showMemberForm.value = true
}

const onUpdateMember = (MemberModel: MemberModel) => {
    selectedMember.value = MemberModel as MemberModel
    showMemberForm.value = true
}

const handleUpdateForm = (MemberModel: any) => {
    console.log(MemberModel, ' handleUpdateForm');
}

onMounted(async () => {
    await onLoadMember()
})

</script>
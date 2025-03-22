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
                    <TableRow v-for="(member, index) in memberList" :key="index">
                        <TableCell class="font-medium">
                            {{ index + 1 }}
                        </TableCell>
                        <TableCell>{{ member.en.name }}</TableCell>
                        <TableCell>{{ member.kh.name }}</TableCell>
                        <TableCell>{{ member.position.en.title }} {{ member.position.kh.title }}</TableCell>
                        <TableCell class="text-right">
                            <button class="bg-green-600 rounded-md px-5 py-2" @click="onUpdateMember(member)">
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

import type Member from '../../scripts/model/member/Member.ts'
import { retriveMemberHandler } from '../../scripts/handler/member/Member.ts'

import type { Emitter } from 'mitt';

// Define Component
const MemberForm = defineAsyncComponent({
    loader: () => import('../../components/form/Member.vue'),
    loadingComponent: { template: '<div>Loading...</div>' },
    delay: 300,
    timeout: 3000
})

// Define Event
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');

// Define Varible
const memberList = ref<Member[]>([] as Member[])
const showMemberForm = ref<boolean>(false)
const selectedMember = ref<Member>({} as Member)


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
    selectedMember.value = {} as Member
    showMemberForm.value = true
}

const onUpdateMember = (member: Member) => {
    selectedMember.value = member as Member
    showMemberForm.value = true
}

const handleUpdateForm = (member: any) => {
    console.log(member, ' handleUpdateForm');
}

onMounted(async () => {
    await onLoadMember()
})

</script>
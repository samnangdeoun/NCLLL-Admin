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
                        <TableHead class="w-[40%]">{{ $t('position') }}</TableHead>
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
                        <TableCell>{{ member.position.kh.title }} ({{ member.position.en.title }})</TableCell>
                        <TableCell class=" flex justify-end gap-2">
                            <button class="bg-green-600 rounded-md px-5 py-2" @click="onUpdateMember(member)">
                                {{ $t('update') }}
                            </button>
                            <button class="bg-red-600 rounded-md px-5 py-2" @click="handleRemoveMember(member)">
                                {{ $t('remove') }}
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

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
import { retriveMemberHandler, removeMemberHandler } from '../../scripts/handler/member/MemberHandler.ts'
import type { Emitter } from 'mitt';
import { toast } from '../../components/ui/toast/use-toast.ts';

// Define Component
const MemberForm = defineAsyncComponent({
    loader: () => import('../../components/form/MemberForm.vue'),
    loadingComponent: { template: '<div>Loading...</div>' },
    delay: 300,
    timeout: 3000
})
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));

// Define Event
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');

// Define Varible
const showConfirmDialog = ref(false);
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

const handleRemoveMember = (member: MemberModel) => {
    if (member?._id) {
        selectedMember.value = member;
        showConfirmDialog.value = true;
    }
};

const handleConfirm = async () => {
    try {
        emitter?.emit("stateLoading", true);
        console.log(selectedMember.value, '-> valuue');
        const { statusCode } = await removeMemberHandler(selectedMember.value as MemberModel);
        console.log(statusCode);
        if (statusCode == 200) {
            memberList.value = memberList.value.filter(p => p._id !== selectedMember?.value?._id);
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

const onCreateMember = () => {
    selectedMember.value = {} as MemberModel
    showMemberForm.value = true
}

const onUpdateMember = (member: MemberModel) => {
    selectedMember.value = member as MemberModel
    showMemberForm.value = true
}

const handleUpdateForm = (member: any) => {
    if (member && member.status == 'New') {
        memberList.value.push(member as MemberModel);
    } else {member
        const index = memberList.value.findIndex(p => p._id === member._id);
        if (index !== -1) {
            memberList.value[index] = (member) as MemberModel;
        }
    }
}

onMounted(async () => {
    await onLoadMember()
})

</script>
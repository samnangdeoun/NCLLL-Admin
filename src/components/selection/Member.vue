<template>
  <Select v-model="selectedMember"  class="w-full" inert>
    <SelectTrigger>
      <SelectValue :value="selectedMember" 
        :placeholder="$t('select_member')" />
    </SelectTrigger>
    <SelectContent class="bg-white">
      <SelectGroup>
        <SelectItem v-for="(member, index) in memberList" :key="index" :value="member._id || ''">
          {{ member.en.name }} - {{ member.kh.name }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select/index.ts";
import { ref, watch } from "vue";
import { validationRules } from '@/utils/validationRule.ts'
import type MemberModel from "@/scripts/model/member/MemberModel.ts";

// Define Props
const props = defineProps({
  memberList: {
    type: Array as () => MemberModel[],
    required: true,
  },
  initMember: {
    type: String,
    required: false,
  },
});

// Define Variables
const selectedMember = ref<string>(props.initMember as string);
// Emit event
const emit = defineEmits(["memberChange"]);

// Watch for changes in selectedMember and emit event
watch(selectedMember, (value: string) => {
  if (value) emit("memberChange", value);
});

// Watch for changes in initMember and update selectedMember accordingly
// Define Watch
watch(
  () => [props.initMember, props.memberList],
  () => {
    if (props.initMember) {
      selectedMember.value = props.initMember;
    }
  },
  { immediate: true }
);
</script>

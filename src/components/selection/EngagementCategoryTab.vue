<template>
  <Select v-model="selectedSubCategory" required class="w-full">
    <SelectTrigger>
      <SelectValue class="capitalize" :rules="[validationRules.required]" required :value="selectedSubCategory" :placeholder="(subCategoryList && subCategoryList.length == 0) ? $t('no_engagement_category') : $t('select_engagement_category')"/>
    </SelectTrigger>
    <SelectContent class="bg-white">
      <SelectGroup>
        <SelectItem v-for="(userTab, index) in subCategoryList" :key="index" :value="userTab || ''">
          <span class="uppercase">{{ userTab }}</span>
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

// Define Props
const props = defineProps({
  initSubCategory: {
    type: String,
    required: false,
  },
  subCategoryList: {
    type: Array,
    required: true,
  },
});

// Define Variables
const subCategoryList = ref<string[]>(props.subCategoryList as string[]);
const selectedSubCategory = ref<string>(props.initSubCategory as string);

// Emit event
const emit = defineEmits(["subCategoryChange"]);

// Watch for changes in selectedSubCategory and emit event
watch(selectedSubCategory, (value: string) => {
  if (value) emit("subCategoryChange", value);
});

// Watch for changes in initSubCategory and update selectedSubCategory accordingly
// Define Watch
watch(
  () => [props.initSubCategory],
  () => {
    if (props.initSubCategory) {
      selectedSubCategory.value = props.initSubCategory;
    }
  },
  { immediate: true }
);
</script>

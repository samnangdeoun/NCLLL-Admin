<template>
  <div>
    <Dialog :open="showForm" @update:open="emit('update:open', $event)">
      <DialogContent class="sm:max-w-[625px] bg-white">
        <DialogHeader>
          <DialogTitle>{{ $t("partner") }}</DialogTitle>
          <DialogDescription>
            {{ $t("partner_form_desc") }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <Tabs default-value="KHMER" class="w-full">
            <TabsList>
              <TabsTrigger value="KHMER">
                {{ $t("khmer") }}
              </TabsTrigger>
              <TabsTrigger value="ENGLISH">
                {{ $t("english") }}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="KHMER">
              <div class="grid grid-cols-2 gap-4 py-4">
                <div>
                  <!-- Name Field -->
                  <div class="flex flex-col items-start justify-center mb-4">
                    <Label for="name" class="text-left mb-1">{{
                      $t("name_kh")
                    }}</Label>
                    <Input
                      id="name"
                      v-model="partner.kh.name"
                      required
                      class="col-span-3"
                    />
                  </div>
                  <!-- Description Field -->
                  <div class="flex flex-col items-start justify-center">
                    <Label for="description" class="text-left mb-1">{{
                      $t("description_kh")
                    }}</Label>
                    <Textarea
                      id="description"
                      rows="6"
                      required
                      v-model="partner.kh.description"
                      class="col-span-3"
                    />
                  </div>
                </div>

                <div>
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label for="image" class="text-left mb-1">{{
                      $t("preview")
                    }}</Label>
                    <div class="h-[8.8rem] w-full border rounded-md">
                      <img
                        v-if="previewImage"
                        :src="previewImage"
                        alt="Partner Logo"
                        class="w-full h-full object-cover bg-cover rounded-md"
                      />
                    </div>
                  </div>
                  <!-- Image URL Field -->
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label for="image" class="text-left mb-1">{{
                      $t("upload_image")
                    }}</Label>
                    <Input
                      id="image"
                      type="file"
                      :required="!previewImage"
                      @onChange="handleFileInput"
                      @input="handleFileInput"
                      class="col-span-3"
                      accept="image/jpeg,image/png,image/gif"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="ENGLISH">
              <div class="grid grid-cols-2 gap-4 py-4">
                <div>
                  <!-- Name Field -->
                  <div class="flex flex-col items-start justify-center mb-4">
                    <Label for="name" class="text-left mb-1">{{
                      $t("name")
                    }}</Label>
                    <Input
                      id="name"
                      v-model="partner.en.name"
                      required
                      class="col-span-3"
                    />
                  </div>
                  <!-- Description Field -->
                  <div class="flex flex-col items-start justify-center">
                    <Label for="description" class="text-left mb-1">{{
                      $t("description")
                    }}</Label>
                    <Textarea
                      id="description"
                      rows="6"
                      required
                      v-model="partner.en.description"
                      class="col-span-3"
                    />
                  </div>
                </div>
                <div>
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label for="image" class="text-left mb-1">{{
                      $t("preview")
                    }}</Label>
                    <div class="h-[8.8rem] w-full border rounded-md">
                      <img
                        v-if="previewImage"
                        :src="previewImage"
                        alt="Partner Logo"
                        class="w-full h-full object-cover bg-cover rounded-md"
                      />
                    </div>
                  </div>
                  <!-- Image URL Field -->
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label for="image" class="text-left mb-1">{{
                      $t("upload_image")
                    }}</Label>
                    <Input
                      id="image"
                      type="file"
                      :required="!previewImage"
                      @onChange="handleFileInput"
                      @input="handleFileInput"
                      class="col-span-3"
                      accept="image/jpeg,image/png,image/gif"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <div>
              <Label for="name" class="text-left mb-1">{{
                $t("website_url")
              }}</Label>
              <Input
                id="name"
                v-model="partner.url"
                required
                class="col-span-3"
              />
            </div>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" @click="$emit('closeForm')">
              Cancel
            </Button>
            <Button type="submit" variant="outline">{{ $t("save") }}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from "vue";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from ".././ui/tabs/index.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from ".././ui/dialog";
import { Button } from ".././ui/button";
import { Input } from ".././ui/input";
import { Label } from ".././ui/label";
import { Textarea } from ".././ui/textarea";
import type { Emitter } from "mitt";

import type PartnerModel from "../../scripts/model/partner/PartnerModel.ts";
import { createPartner } from "../../scripts/model/partner/PartnerModel.ts";
import { uploadFileHandler } from "@/scripts/handler/FileUploadHanlder.ts";
import {
  createPartnerHandler,
  updatePartnerHandler,
} from "@/scripts/handler/partner/PartnerHandler.ts";
import { useToast } from "../ui/toast/use-toast.ts";
import { useI18n } from "vue-i18n";

const props = defineProps({
  partner: {
    type: Object,
    required: true,
  },
  showForm: {
    type: Boolean,
    required: true,
  },
});

// Define variables
const { t } = useI18n();
const { toast } = useToast();
const partner = ref(JSON.parse(JSON.stringify(props.partner)));
const showForm = ref<boolean>(props.showForm);
const status = ref<string>("New");
const previewImage = ref<string>("");
const _file = ref<File | null>(null);
const _fileChange = ref<boolean>(false);

// Define props and emits
const emit = defineEmits(["update:open", "updateForm", "closeForm"]);
const emitter = inject<Emitter<{ [event: string]: unknown }>>("emitter");

// Define methods
const handleFileInput = (event: { target: { files: any[] } }) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    previewImage.value = reader.result as string;
    _file.value = file as File;
    _fileChange.value = true;
  };
  reader.readAsDataURL(file);
};

const onHandleSummitForm = async () => {
  try {
    if (_fileChange.value && _file.value) {
      try {
        const { data, statusCode } = await uploadFileHandler(_file.value);

        if (statusCode === 200 && data?.url) {
          partner.value.logo = data.url;
        } else {
          throw new Error("File upload failed");
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }

    const action =
      status.value === "New" ? onHandleCreatePartner : onHandleUpdatePartner;
    await action();
  } catch (e) {
    console.log(e);
  }
};

const onHandleCreatePartner = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { message, data, statusCode } = await createPartnerHandler(
      partner.value as PartnerModel
    );
    console.log(message, data, statusCode);
    if (statusCode == 200 && data) {
      emit("updateForm", {
        ...data,
        status: status.value,
      });
      toast({
        description: t("create_banner_success"),
        variant: "success",
        title: t("success"),
      });
      emit("closeForm");
    }
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      emitter?.emit("stateLoading", false);
    }, 500);
  }
};

const onHandleUpdatePartner = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { message, data, statusCode } = await updatePartnerHandler(
      partner.value as PartnerModel
    );
    console.log(message, data, statusCode);
    if (statusCode == 200 && data) {
      emit("updateForm", {
        ...data,
        status: status.value,
      });
      toast({
        description: t("update_banner_success"),
        variant: "success",
        title: t("success"),
      });
      emit("closeForm");
    }
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      emitter?.emit("stateLoading", false);
    }, 500);
  }
};

// Define Watch
watch(
  () => [props.partner, props.showForm],
  () => {
    if (props.partner && props.partner._id) {
      partner.value = createPartner(
        JSON.parse(JSON.stringify(props.partner)) as PartnerModel
      );
      previewImage.value = props.partner.logo;
      status.value = "Update";
    } else {
      partner.value = createPartner();
      status.value = "New";
      previewImage.value = "";
    }
    showForm.value = props.showForm;
  },
  { immediate: true }
);
</script>

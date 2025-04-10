<template>
  <div>
    <Card class="h-[88vh]">
      <CardHeader>
        <CardTitle>{{ $t("maintenance") }}</CardTitle>
      </CardHeader>
      <CardContent>
        <table class="w-full">
          <tbody>
            <tr>
              <td>
                <Label for="maintenance">{{ $t("maintenance_mode") }}</Label>
              </td>
              <td>
                <Switch class="text-[#34C759]"
                  v-model="maintenance_mode"
                  @update:model-value="showConfirmation = true"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
      <!-- <CardFooter>Thank You.</CardFooter> -->
    </Card>
    <ConfirmDialog
      v-model:open="showConfirmation"
      title="Delete Item"
      description="Are you sure you want to delete this item? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ConfirmDialog from "@/components/custom/ConfirmDialog.vue";
import {
  retriveSettingHandler,
  updateSettingHandler,
} from "@/scripts/handler/auth/AuthHandler.ts";
import { ref, inject, onMounted } from "vue";
import { useToast } from "../../components/ui/toast/use-toast.ts";
import type { Emitter } from "mitt";

const showConfirmation = ref<boolean>(false);
const { toast } = useToast();
const emitter = inject<Emitter<{ [event: string]: unknown }>>("emitter");
const maintenance_mode = ref<boolean>(false);

const handleConfirm = async () => {
  showConfirmation.value = false;
  try {
    const { statusCode } = await updateSettingHandler({
      maintenanceMode: maintenance_mode.value,
    });
    if (statusCode == 200) {
      toast({
        title: "Maintenance Mode",
        description: "The Maintenance Mode has been Updated.",
        variant: "success",
      });
    } else {
      toast({
        title: "Something went wrong",
        description: "The item has not been deleted.",
        variant: "warning",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const handleCancel = () => {
  maintenance_mode.value = !maintenance_mode.value;
}

const onLoadSetting = async () => {
  try {
    const { data, statusCode } = await retriveSettingHandler();

    if (statusCode == 200) {
      maintenance_mode.value = data.maintenanceMode;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await onLoadSetting();
});
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

table tr {
    padding: 20px 20px;
    border-bottom: 1px solid #ddd;
}
</style>
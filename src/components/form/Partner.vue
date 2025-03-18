<template>
  <div>
    <Dialog v-model:open="showPartnerForm">
      <DialogTrigger as-child>
        <!-- Trigger is handled by the button above -->
      </DialogTrigger>
      <DialogContent class="sm:max-w-[625px] bg-white ">
        <DialogHeader>
          <DialogTitle>Partner</DialogTitle>
          <DialogDescription>
            Make changes to the organization details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid gap-4 py-4">
            <!-- Image URL Field -->
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="image" class="text-right">Image URL</Label>
              <Input
                id="image"
                v-model="partnerInfo.image"
                class="col-span-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <!-- Name Field -->
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">Name</Label>
              <Input
                id="name"
                v-model="partnerInfo.name"
                class="col-span-3"
                placeholder="Organization name"
              />
            </div>

            <!-- Description Field -->
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="description" class="text-right">Description</Label>
              <Textarea
                id="description"
                rows="5"
                v-model="partnerInfo.description"
                class="col-span-3"
                placeholder="Enter description"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" @click="closeDialog">
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'


const partnerInfo = ref({
    
})

// Define props and emits
const showPartnerForm = ref(true)
const emit = defineEmits(['update', 'close'])
</script>
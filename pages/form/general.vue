<script setup lang="ts">
import {
  TwForm,
  TwButton,
  TwFile,
  TwInput,
  TwMultiSelect,
  TwSelect,
  TwToggle,
  TwTextarea,
} from "vue3-tailwind";
import { useFormExample } from "@/store/formExample";
const formExample = useFormExample();
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Form</h2>
    <hr class="my-2 border dark:border-gray-700" />
    <div>
      <TwForm :name="formExample.formName"
        class="grid grid-cols-12 gap-2 bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded-lg p-2 shadow"
        :class="{
          'tw-shake': formExample.isError,
        }" :rules="formExample.formRules" @submit="formExample.submit()" :custom-field-name="{
  inputExample: 'Input',
  textAreaExample: 'Text Area',
}">
        <div class="col-span-12">
          <TwInput label="Nama Rental Mobile" name="name" v-model="formExample.formData.inputName"
            placeholder="Nama Rental Mobile" type="text" />
          <CustomErrorMessage name="Name" />
        </div>
        <div class="col-span-12">
          <TwInput label="Nama Rental Mobile" name="number" v-model="formExample.formData.inputRating"
            placeholder="Nama Rental Mobile" type="text" />
          <CustomErrorMessage name="Rating" />
        </div>
        <div class="flex gap-5 items-end">
          <div class="col-span-12">
            <TwInput label="Jam Buka" name="buka" v-model="formExample.formData.inputBuka" placeholder="Jam Buka"
              type="time" />
            <CustomErrorMessage name="Buka" />
          </div>
          <h1>Sampai</h1>
          <div class="col-span-12">
            <TwInput label="Jam Tutup" name="tutup" v-model="formExample.formData.inputTutup" placeholder="Jam Tutup"
              type="time" />
            <CustomErrorMessage name="Tutup" />
          </div>
        </div>
        <div class="col-span-12">
          <TwTextarea label="Textarea" name="textAreaExample" v-model="formExample.formData.textAreaExample"
            placeholder="Textarea Field" type="text" />
          <CustomErrorMessage name="textAreaExample" />
        </div>
        <div class="col-span-12">
          <TwSelect label="Single Select" name="selectExample" v-model="formExample.formData.selectExample"
            :items="formExample.selectionList" placeholder="Choose select" />
          <CustomErrorMessage name="selectExample" />
        </div>
        <div class="col-span-12">
          <TwMultiSelect label="Multi Select" name="multiSelectExample"
            v-model="formExample.formData.multiSelectExample" :items="formExample.selectionList"
            placeholder="Choose select" />
          <CustomErrorMessage name="multiSelectExample" />
        </div>
        <div class="col-span-12">
          <TwToggle label="Toggle" name="toggleExample" id="toggle" v-model="formExample.formData.toggleExample" />
          <CustomErrorMessage name="toggleExample" />
        </div>
        <div class="col-span-12 flex justify-end gap-1">
          <TwButton ripple variant="secondary" type="button" class="px-4" @click="formExample.clear()">
            Reset
          </TwButton>
          <TwButton ripple type="submit" class="px-4"> Submit </TwButton>
        </div>
      </TwForm>
    </div>
  </div>
</template>

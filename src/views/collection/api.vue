<template>
  <div class="flex-1 flex flex-col">
    <div class="p-2 border-b flex justify-between">
      <n-breadcrumb style="line-height: 1">
        <n-breadcrumb-item>{{ api.collectionName }}</n-breadcrumb-item>
        <n-breadcrumb-item>{{ api.name }}</n-breadcrumb-item>
      </n-breadcrumb>
      <div>
        <n-button-group size="small">
          <n-button secondary>
            <n-icon class="mr-1" :component="SaveOutline"></n-icon>
            Save
          </n-button>
          <n-button secondary>
            <n-icon :component="ChevronDown"></n-icon>
          </n-button>
        </n-button-group>
      </div>
    </div>
    <div class="p-2 border-b">
      <n-input-group>
        <n-select :options="methodOptions" placeholder="method" class="w-36" />
        <n-input  />
      </n-input-group>
    </div>
    <div class="flex border-b flex-1">
      <n-tabs class="mx-2" size="small">
        <n-tab-pane name="Params" tab="Params">
          Params
        </n-tab-pane>
        <n-tab-pane name="Authorization" tab="Authorization">
          Authorization
        </n-tab-pane>
        <n-tab-pane name="Headers" tab="Headers"></n-tab-pane>
        <n-tab-pane name="Body" tab="Body"></n-tab-pane>
        <n-tab-pane name="Pre-request Script" tab="pre-script"></n-tab-pane>
        <n-tab-pane name="Tests" tab="Tests"></n-tab-pane>
        <n-tab-pane name="Settings" tab="Settings"></n-tab-pane>
      </n-tabs>
    </div>
    <div class="flex-1">
      Response
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown, SaveOutline } from "@vicons/ionicons5";
const route = useRoute();
const apiId = computed(() => {
  return route?.params?.api;
});
const api = ref({
  collectionId: "1",
  name: "getArticleList",
  collectionName: "localhost",
  method: "GET",
  url: "{{host}}/article/list",
});
const methodOptions = [
  {
    label: "GET",
    value: "GET",
  },
  {
    label: "POST",
    value: "POST",
  },
  {
    label: "PUT",
    value: "PUT",
  },
  {
    label: "DELETE",
    value: "DELETE",
  },
];
</script>

<style scoped></style>

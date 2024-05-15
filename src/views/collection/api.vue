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
        <n-select
          v-model:value="api.method"
          :options="methodOptions"
          placeholder="method"
          class="w-36"
        />
        <n-input v-model:value="api.url" />
        <n-button @click="send" type="primary">send</n-button>
      </n-input-group>
    </div>
    <div class="flex border-b flex-1">
      <MutColumn direction="bottom" class="w-full">
        <n-tabs class="mx-2" size="small">
          <n-tab-pane name="Params" tab="Params">
            Query Params
            <n-data-table
              size="small"
              :single-line="false"
              bordered
              :columns="columns"
              :data="data"
            />
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
      </MutColumn>
    </div>
    <div class="flex-1">Response</div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown, SaveOutline } from "@vicons/ionicons5";
import post from "@/utils/request";
import MutColumn from "@/components/MutColumn.vue";
import { NInput } from "naive-ui";
import type { DataTableColumns } from "naive-ui";

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

type RowData = {
  key: string;
  value: string;
  description: string;
};

const columns: DataTableColumns<RowData> = [
  {
    title: "Key",
    key: "key",
    render(row, index) {
      return h(NInput, {
        size: "small",
        value: row.key,
        onUpdateValue(v) {
          data.value[index].key = v;
        },
      });
    },
  },
  {
    title: "Value",
    key: "value",
    render(row, index) {
      return h(NInput, {
        size: "small",
        value: row.value,
        onUpdateValue(v) {
          data.value[index].value = v;
        },
      });
    },
  },
  {
    title: "Description",
    key: "description",
    render(row, index) {
      return h(NInput, {
        size: "small",
        value: row.description,
        onUpdateValue(v) {
          data.value[index].description = v;
        },
      });
    },
  },
];
const data = ref<RowData[]>([{} as RowData]);

async function send() {
  const res = await post({ url: '"/api/verify"' });
  console.log(res);
}
</script>

<style scoped></style>

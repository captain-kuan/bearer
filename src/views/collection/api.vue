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
      <MutColumn direction="bottom" class="w-full px-2">
        <n-tabs size="small">
          <n-tab-pane name="Params" tab="Params">
            Query Params
            <n-data-table
              size="small"
              :row-key="(row) => row.id"
              :single-line="false"
              bordered
              :columns="paramsColumns"
              :data="params"
              :checked-row-keys="checkedParamIds"
              @update:checked-row-keys="handleParamsCheck"
            />
          </n-tab-pane>
          <n-tab-pane name="Authorization" tab="Authorization">
            Authorization
          </n-tab-pane>
          <n-tab-pane name="Headers" tab="Headers">
            <n-data-table
              size="small"
              :row-key="(row) => row.id"
              :single-line="false"
              bordered
              :columns="headerColumns"
              :data="headers"
              :checked-row-keys="checkedHeaderIds"
              @update:checked-row-keys="handleHeaderCheck"
            />
          </n-tab-pane>
          <n-tab-pane name="Body" tab="Body">
            <n-radio-group v-model:value="bodyType" name="radiogroup">
              <n-space>
                <n-radio
                  v-for="song in bodyTypeOptions"
                  :key="song.value"
                  :value="song.value"
                >
                  {{ song.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
            <div>
              <div class="h-64" ref="editorRef"></div>
            </div>
          </n-tab-pane>
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
import { http } from "@/utils/request";
import MutColumn from "@/components/MutColumn.vue";
import { NInput } from "naive-ui";
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import { InternalRowData } from "naive-ui/es/data-table/src/interface";
import { useEditor } from "@/hooks/useEditor";
import { editor } from "monaco-editor";
function* generateId() {
  let id = 0;
  while (true) {
    yield id++;
  }
}
const id = generateId();

const route = useRoute();
const apiId = computed(() => {
  return route?.params?.api;
});
const api = reactive({
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

type ParamData = {
  id: number;
  key: string;
  value: string;
  description: string;
};

function getRender<T = InternalRowData>(
  key: keyof T,
  onUpdateValue: (v: string, index: number) => void
) {
  return (row: T, index: number) =>
    h(NInput, {
      size: "small",
      value: row[key] as string,
      onUpdateValue(v) {
        onUpdateValue(v, index);
      },
    });
}
const paramsColumns: DataTableColumns<ParamData> = [
  {
    type: "selection",
  },
  {
    title: "Key",
    key: "key",
    render: getRender("key", (v, index) => {
      addParamRow(index);
      params.value[index].key = v;
    }),
  },
  {
    title: "Value",
    key: "value",
    render: getRender("value", (v, index) => {
      addParamRow(index);
      params.value[index].value = v;
    }),
  },
  {
    title: "Description",
    key: "description",
    render: getRender("description", (v, index) => {
      addParamRow(index);
      params.value[index].description = v;
    }),
  },
];

function addParamRow(index: number) {
  if (params.value.length - 1 === index) {
    const param = {
      id: id.next().value!,
      key: "",
      value: "",
      description: "",
    };
    params.value.push(param);
    checkedParamIds.value.push(index);
  }
}
const params = ref<ParamData[]>([
  { id: id.next().value!, key: "", value: "", description: "" },
]);
const checkedParamIds = ref<DataTableRowKey[]>([]);

function handleParamsCheck(rowKeys: DataTableRowKey[]) {
  checkedParamIds.value = rowKeys;
}

type HeaderData = {
  id: number;
  key: string;
  value: string;
  description: string;
};
const headers = ref<ParamData[]>([
  { id: id.next().value!, key: "", value: "", description: "" },
]);

const headerColumns: DataTableColumns<HeaderData> = [
  { type: "selection" },
  {
    title: "Key",
    key: "key",
    render: getRender("key", (v, index) => {
      addHeaderRow(index);
      headers.value[index].key = v;
    }),
  },
  {
    title: "Value",
    key: "value",
    render: getRender("value", (v, index) => {
      addHeaderRow(index);
      headers.value[index].value = v;
    }),
  },
  {
    title: "Description",
    key: "description",
    render: getRender("description", (v, index) => {
      addHeaderRow(index);
      headers.value[index].description = v;
    }),
  },
];
function addHeaderRow(index: number) {
  if (headers.value.length - 1 === index) {
    const header = {
      id: id.next().value!,
      key: "",
      value: "",
      description: "",
    };
    headers.value.push(header);
    checkedHeaderIds.value.push(index);
  }
}

const checkedHeaderIds = ref<DataTableRowKey[]>([]);

function handleHeaderCheck(rowKeys: DataTableRowKey[]) {
  checkedParamIds.value = rowKeys;
}

const bodyType = ref("");

const bodyTypeOptions = [
  {
    value: "none",
    label: "none",
  },
  { value: "form-data", label: "form-data" },
  { value: "x-www-form-urlencoded", label: "x-www-form-urlencoded" },
  { value: "row", label: "row" },
  { value: "binary", label: "binary" },
  { value: "GraphQL", label: "GraphQL" },
];
function selectedRow2Object<
  T extends { key: string; value: string; id: number }
>(ids: DataTableRowKey[], table: T[]) {
  return ids.reduce((pre, id) => {
    const { key, value } = table.find((p) => p.id === id)!;
    return Object.assign(pre, { [key]: value });
  }, {});
}
async function send() {
  const paramsObject = selectedRow2Object(checkedParamIds.value, params.value);
  const headerObject = selectedRow2Object(
    checkedHeaderIds.value,
    headers.value
  );

  const res = await http({ url: api.url, method: api.method });
}
const editorRef = ref();
let editorSign: editor.IStandaloneCodeEditor;

watch(bodyType, (type) => {
  if (type === "row") {
    nextTick(() => {
      if (editorSign) {
        return;
      }
      let { editor } = useEditor({ dom: editorRef.value });
      editorSign = editor;
    });
  }
});
</script>

<style scoped></style>

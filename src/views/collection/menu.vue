<template>
  <div class="p-1 flex flex-col flex-1 text-">
    <div class="flex">
      <n-button size="tiny" quaternary>
        <n-icon :component="Add"></n-icon>
      </n-button>
      <div class="flex-1">
        <n-input size="tiny" placeholder="">
          <template #prefix> <n-icon :component="Filter" /> </template>
        </n-input>
      </div>

      <n-button size="tiny" quaternary>
        <n-icon :component="EllipsisHorizontalOutline"></n-icon>
      </n-button>
    </div>
    <n-menu
      default-expand-all
      :render-label="renderMenuLabel"
      :root-indent="5"
      dropdown-placement="left"
      size="tiny"
      :options="menus"
    ></n-menu>
  </div>
</template>

<script setup lang="ts">
import { Add, Filter, EllipsisHorizontalOutline } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import type { METHOD } from "@/types";
import { RouterLink } from "vue-router";
import type { MenuOption } from "naive-ui";

const methodColorMap: Record<METHOD, string> = {
  GET: "text-green-600",
  POST: "text-sky-600",
  PUT: "text-yellow-600",
  DELETE: "text-red-600",
};
function renderMethod(method: METHOD) {
  return () =>
    h(
      "div",
      { class: `text-tiny ${methodColorMap[method]} text-right` },
      { default: () => method }
    );
}
const menus = [
  {
    label: "且听风吟",
    key: "hear-the-wind-sing",
    children: [
      {
        label: "get Data",
        key: "/get/data",
        icon: renderMethod("GET"),
      },
      {
        label: "add Date",
        key: "/post/data",
        icon: renderMethod("POST"),
      },
      {
        label: "update Date",
        key: "/update/data",
        icon: renderMethod("PUT"),
      },
      {
        label: "delete Date",
        key: "/delete/data",
        icon: renderMethod("DELETE"),
      },
    ],
  },
];
function renderMenuLabel(menu: MenuOption) {
  return h(
    RouterLink,
    {
      to: {
        name: "CollectionSender",
        params: {
          api: menu.key,
        },
      },
    },
    { default: () => menu.label }
  );
}
</script>

<style lang="less" scoped></style>

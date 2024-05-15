<template>
  <div class="flex-1 flex flex-col">
    <div class="flex flex-1">
      <MutColumn :width="350" :min-width="255" :max-width="600">
        <div class="flex justify-between p-2 border-b">
          <n-button text>
            <n-icon class="mr-2"><PersonOutline /></n-icon> My Workspace
          </n-button>
          <div class="flex">
            <n-button class="mr-1" size="tiny" secondary> New </n-button>
            <n-button size="tiny" secondary> Import </n-button>
          </div>
        </div>
        <div class="flex-1 flex">
          <div class="border-r p-1">
            <div
              v-for="menu in menus"
              class="text-xs hover:bg-gray-100 text-gray-600 px-1 py-2 rounded flex flex-col justify-center items-center"
              :class="{ ' text-black': false }"
            >
              <n-icon :component="menu.icon" size="20" />
              <div>{{ menu.title }}</div>
            </div>
          </div>
          <router-view name="menu"></router-view>
        </div>
      </MutColumn>
      <div class="flex-1 flex flex-col">
        <div class="border-b px-2">
          <n-tabs type="card" size="small" closable>
            <n-tab name="oasis" tab="Oasis"> </n-tab>
          </n-tabs>
        </div>
        <router-view name="main"></router-view>
      </div>
    </div>
    <footer class=" border-t">footer</footer>
  </div>
</template>

<script setup lang="ts">
import { PersonOutline, AlbumsOutline, CubeOutline } from "@vicons/ionicons5";
import { FieldTimeOutlined } from "@vicons/antd";

const menus = [
  { title: "Collections", icon: AlbumsOutline },
  { title: "Environments", icon: CubeOutline },
  { title: "History", icon: FieldTimeOutlined },
];
</script>

<style scoped></style>

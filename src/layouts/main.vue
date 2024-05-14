<template>
  <article class="h-screen flex flex-col">
    <header data-tauri-drag-region class="bg-gray-50 p-2 flex gap-1">
      <div></div>
      <div>
        <n-button quaternary>
          <n-icon>
            <ArrowBack />
          </n-icon>
        </n-button>
        <n-button quaternary>
          <n-icon>
            <ArrowForward />
          </n-icon>
        </n-button>
      </div>
      <n-button quaternary>Home</n-button>

      <n-popover trigger="hover" :show-arrow="false">
        <template #trigger>
          <n-button quaternary>
            Workspaces
            <n-icon class="ml-1">
              <ChevronDown></ChevronDown>
            </n-icon>
          </n-button>
        </template>
        <span>没有箭头就是矩形了</span>
      </n-popover>
      <div class="w-64 mr-2">
        <n-input v-model:value="searchText" type="text" placeholder="bearer">
          <template #prefix> <n-icon :component="Search" /> </template>
        </n-input>
      </div>
    </header>
    <section class="flex-1 flex flex-col">
      <router-view></router-view>
    </section>
  </article>
</template>

<script setup lang="ts">
import {
  ArrowBack,
  ArrowForward,
  ChevronDown,
  ChevronUp,
  Search,
} from "@vicons/ionicons5";
const searchText = ref("");
</script>

<style scoped></style>

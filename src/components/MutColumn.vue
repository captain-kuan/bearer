<template>
  <div :class="[direction]" class="flex h-full relative">
    <div
      class="h-full w-full flex-1 flex flex-col overflow-hidden"
      :style="computedStyle"
    >
      <slot></slot>
    </div>
    <div
      class="divider-area z-10 absolute flex justify-center items-center"
      @mousedown="handleMouseDown"
    >
      <div class="divider"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Direction = "right" | "bottom";

const props = withDefaults(
  defineProps<{
    width: number;
    minWidth?: number;
    maxWidth?: number;
    direction?: Direction;
  }>(),
  {
    direction: "right",
    width: 355,
    minWidth: 0,
    maxWidth: 1000,
  }
);
const _width = ref(props.width);
const width = computed({
  get() {
    return _width.value;
  },
  set(v) {
    if (v > props.maxWidth || v < props.minWidth) {
      return;
    }
    _width.value = v;
  },
});
const computedStyle = computed(() => {
  return props.direction === "right"
    ? {
        width: `${width.value}px`,
      }
    : {
        height: `${width.value}px`,
      };
});
let startWidth = width.value;
let startPosition = 0;
function handleMouseDown(e: MouseEvent) {
  startPosition = props.direction === "right" ? e.clientX : e.clientY;
  startWidth = width.value;
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}
function handleMouseMove(e: MouseEvent) {
  width.value =
    startWidth +
    (props.direction === "right" ? e.clientX : e.clientY) -
    startPosition;
}
function handleMouseUp(e: MouseEvent) {
  width.value =
    startWidth +
    (props.direction === "right" ? e.clientX : e.clientY) -
    startPosition;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}
</script>

<style lang="less" scoped>
.right {
  .divider-area {
    right: 0;
    transform: translateX(50%);
    height: 100%;
    width: 10px;
    .divider {
      width: 1px;
      background: #e5e7eb;
    }
    &:hover {
      cursor: col-resize;
      .divider {
        width: 2px;
        background: blue;
      }
    }
  }
  .divider {
    width: 1px;
    height: 100%;
    background: #e5e7eb;
  }
}

.bottom {
  .divider-area {
    bottom: 0;
    transform: translateY(50%);
    width: 100%;
    height: 10px;
    .divider {
      height: 1px;
      background: #e5e7eb;
    }
    &:hover {
      cursor: row-resize;
      .divider {
        height: 2px;
        background: blue;
      }
    }
  }
  .divider {
    height: 1px;
    width: 100%;
    background: #e5e7eb;
  }
}
</style>

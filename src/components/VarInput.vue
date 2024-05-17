<template>
  <div
    class="n-input n-input--resizable n-input--stateful var-input"
    contenteditable="true"
    @input="handleInput($event as InputEvent)"
  >
    <div class="n-input-wrapper">
      <div class="n-input__input" v-html="displayValue"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ value: string }>();
const emit = defineEmits<{ "update:value": [value: string] }>();
function handleInput(e: InputEvent) {
  emit("update:value", e.target?.innerText);
}

const displayValue = computed(() => {
  return props.value.replace(/({{.*}})/, (value) => {
    return `<span class="var-value">${value}</span>`;
  });
});
</script>

<style lang="less">
.var-input {
  padding: 0 12px;
  border: 1px solid rgb(224, 224, 230);
  line-height: 32px;
  transition: border-color 0.3s ease;
  .var-value {
    color: #c18401;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  &:focus {
    border: 1px solid #36ad6a;
    box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
  }
}
</style>

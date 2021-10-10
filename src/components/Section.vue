<template>
  <div :class="$style.section_container">
    <span :class="$style.section_title">{{ title }}</span>
    <div :class="$style.grid_section"><slot name="contents" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Section",
  props: {
    title: String,
  },
});
</script>

<style lang="less" module>
.section_container {
  margin-bottom: 50px;
}

.setcion_title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 25px;
}

.grid_section {
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
}
</style>

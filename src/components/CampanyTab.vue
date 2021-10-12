<template>
  <div :class="$style.logo_wrapper">
    <div :class="$style.logo_container" v-for="com in companys" :key="com.id">
      <img v-if="com.logo_path" :src="`${IMAGE_URL}/${com.logo_path}`" />
      <span>{{ com.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { IMAGE_URL } from "@/utils/constants";
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "CompanyTab",
  props: {
    companys: Object,
  },
  setup(props) {
    const { companys } = toRefs(props);
    const company = companys.value;
    return { company, IMAGE_URL };
  },
});
</script>

<style lang="less" module>
.logo_wrapper {
  display: grid;
  grid-template-columns: repeat(3, 0.6fr);
  grid-gap: 15px;
}
.logo_container {
  display: flex;
  flex-direction: column;
}
</style>

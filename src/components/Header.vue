<template>
  <header :class="$style.header_container">
    <ul>
      <li
        :class="[
          $style.header_item,
          { path_active: currentPath.path === home },
        ]"
      >
        <router-link :to="home" :class="$style.header_link">Movies</router-link>
      </li>
      <li
        :class="[$style.header_item, { path_active: currentPath.path === tv }]"
      >
        <router-link :to="tv" :class="$style.header_link">TV</router-link>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import { defineComponent, Ref } from "@vue/runtime-core";
import { ROUTES } from "@/utils/constants";
import { RouteLocationNormalizedLoaded } from "vue-router";

export default defineComponent({
  name: "Header",
  data() {
    return {
      currentPath: this.$router
        .currentRoute as Ref<RouteLocationNormalizedLoaded>,
      home: ROUTES.home as string,
      tv: ROUTES.tv as string,
    };
  },
});
</script>

<style lang="less" module>
.header_container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  background-color: rgba(20, 20, 20, 1);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  z-index: 10;

  ul {
    display: flex;
  }
}

.header_item {
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 5px solid;
  border-color: transparent;
  transition: border-bottom 0.5s ease-in-out;
  z-index: 11;
}

.header_link {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>

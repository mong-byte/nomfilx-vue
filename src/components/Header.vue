<template>
  <header :class="$style.header_container">
    <ul>
      <li :class="$style.header_item">
        <router-link
          :to="home"
          :class="[
            { path_active: currentPath.path === home },
            $style.header_link,
          ]"
          >home</router-link
        >
      </li>
      <li>
        <router-link
          :to="tv"
          :class="[{ active: currentPath.path === tv }, $style.header_link]"
          >tv</router-link
        >
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ROUTES } from "../utils/constants";

export default defineComponent({
  name: "Header",
  data() {
    return {
      currentPath: this.$router.currentRoute,
      home: ROUTES.home,
      tv: ROUTES.tv,
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
  background-color: rgba(20, 20, 20, 0.7);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);

  ul {
    display: flex;
  }
}

.header_item {
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 5px solid transparent;
  transition: border-bottom 0.5s ease-in-out;
}

.header_link {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.path_active {
  color: red;
}
</style>

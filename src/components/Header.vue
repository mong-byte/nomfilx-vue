<template>
  <header :class="$style.header_container">
    <ul>
      <li :class="[$style.header_item, { path_active: path === home }]">
        <router-link :to="home" :class="$style.header_link">Movies</router-link>
      </li>
      <li :class="[$style.header_item, { path_active: path === tv }]">
        <router-link :to="tv" :class="$style.header_link">TV</router-link>
      </li>
      <li :class="[$style.header_item, { path_active: path === search }]">
        <router-link :to="search" :class="$style.header_link"
          >Search</router-link
        >
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { ROUTES } from "@/utils/constants";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Header",
  setup() {
    const route = useRoute();
    const path = computed(() => route.path);

    const state = {
      home: ROUTES.home as string,
      tv: ROUTES.tv as string,
      search: ROUTES.search as string,
    };
    return { path, ...state };
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

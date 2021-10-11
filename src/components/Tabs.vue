<template>
  <div :class="$style.tabContainer">
    <div><span>This is title</span></div>
    <button @click="changeTabs(`VideoTab`)">video</button>
    <button @click="changeTabs(`DescriptionTab`)">description</button>
    <div>
      <component :is="currentComponent" :videos="videos"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import VideoTab from "@/components/VideoTab.vue";
import DescriptionTab from "@/components/DescriptionTab.vue";

export default defineComponent({
  name: "Tabs",
  props: {
    result: Object,
  },
  setup(props) {
    const state = reactive({
      currentTab: "VideoTab",
    });
    const { result } = toRefs(props);
    const { currentTab } = toRefs(state);
    const videos = result.value?.videos.results;
    const currentComponent = computed(() => {
      return state.currentTab;
    });

    const changeTabs = (name: string) => {
      return (currentTab.value = name);
    };

    return { currentComponent, currentTab, changeTabs, videos };
  },
  components: {
    VideoTab,
    DescriptionTab,
  },
});
</script>

<style lang="less" module>
.tabContainer {
  width: 100%;
  height: 40%;
  margin: 0 30px;
}
</style>

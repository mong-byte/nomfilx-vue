<template>
  <!-- <div :class="$style.button_box">
  </div> -->
  <div :class="$style.tab_wrapper">
    <button
      :class="[$style.tab_button, { tab_active: currentTab === `VideoTab` }]"
      @click="changeTabs(`VideoTab`)"
    >
      Video
    </button>
    <button
      :class="[$style.tab_button, { tab_active: currentTab === `CompanyTab` }]"
      @click="changeTabs(`CompanyTab`)"
    >
      Companys
    </button>
    <div :class="$style.tab_container">
      <div>
        <component
          :is="currentComponent"
          :videoData="videoData"
          :companys="companys"
        ></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import VideoTab from "@/components/VideoTab.vue";
import CompanyTab from "@/components/CampanyTab.vue";

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
    const videoData = {
      video: result.value?.video,
      videos: result.value?.videos.results,
    };
    const companys = result.value?.production_companies;

    const currentComponent = computed(() => {
      return state.currentTab;
    });

    const changeTabs = (name: string) => {
      return (currentTab.value = name);
    };

    return { currentComponent, currentTab, changeTabs, videoData, companys };
  },
  components: {
    VideoTab,
    CompanyTab,
  },
});
</script>

<style lang="less" module>
.tab_wrapper {
  width: 100%;
  height: 50%;

  &:nth-child(2) {
    margin-left: 10px;
  }
}

.tab_container {
  display: flex;
  align-self: flex-end;
  height: 90%;
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
}

.tab_button {
  all: unset;
  padding: 15px 8px;
  color: #ffffff;
  cursor: pointer;
}
</style>

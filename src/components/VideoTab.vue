<template>
  <div>
    <div :class="$style.video_container">
      <div
        :class="$style.video_item"
        v-for="video in videoArray"
        :key="video.id"
      >
        <iframe :src="`${VIDEO_URL}${video.key}`" frameborder="0"></iframe>
        <span>{{ video.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { VIDEO_URL } from "@/utils/constants";

export default defineComponent({
  name: "Video",
  props: {
    videoData: Object,
  },
  setup(props) {
    const { videoData } = toRefs(props);
    const videoArray = videoData.value?.videos;

    return { videoArray, VIDEO_URL };
  },
});
</script>

<style lang="less" module>
.video_container {
  display: grid;
  grid-template-columns: repeat(3, 0.6fr);
  grid-gap: 15px;
}

.video_item {
  display: flex;
  flex-direction: column;
}
</style>

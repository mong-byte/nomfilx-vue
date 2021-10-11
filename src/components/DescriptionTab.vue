<template>
  <div>
    <span>description</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Description",
  props: {
    videos: Object,
  },
  setup(props) {
    return { props };
  },
});
</script>

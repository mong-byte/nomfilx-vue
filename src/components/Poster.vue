<template>
  <router-link :to="isMovie ? `/movie/${id}` : `/show/${id}`">
    <div :class="$style.poster_container">
      <div :class="$style.poster_image_container">
        <img :class="$style.poster_image" :src="imgSrc" alt="poster" />
        <span :class="$style.poster_rating" role="img" aria-label="rating"
          >⭐️ {{ rating }} / 10</span
        >
      </div>
      <span :class="$style.poster_title">{{
        title.length > 18 ? `${title.substring(0, 18)}...` : title
      }}</span>
      <span :class="$style.year">{{ year }}</span>
    </div>
  </router-link>
</template>

<script lang="ts">
import { IMAGE_URL } from "@/utils/constants";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Poster",
  data() {
    return {
      imgSrc: `${IMAGE_URL}${this.imageUrl}` as string,
    };
  },
  props: {
    id: Number,
    imageUrl: String,
    title: String,
    rating: Number,
    year: String,
    isMovie: Boolean,
  },
});
</script>

<style lang="less" module>
.poster_container {
  font-size: 12px;
}

.poster_image_container {
  margin-bottom: 5px;
  position: relative;
  &:hover {
    .poster_image {
      opacity: 0.3;
    }
    .poster_rating {
      opacity: 1;
    }
  }
}

.poster_image {
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
}

.poster_rating {
  bottom: 5px;
  right: 10px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1 linear;
}

.poster_title {
  display: block;
  margin-bottom: 3px;
}

.year {
  font-size: 10px;
  color: rgba(2555, 255, 255, 0.5);
}
</style>

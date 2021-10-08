<template>
  <div v-if="!loading" :class="$style.detail_container">
    <div
      :class="$style.back_drop"
      :style="{
        backgroundImage: `url(${baseImgPath}${result.backdrop_path})`,
      }"
    />
    <div :class="$style.detail_contents">
      <div
        :class="$style.poster"
        :style="{
          backgroundImage: `url(${baseImgPath}${result.poster_path})`,
        }"
      />
      <div :class="$style.detail_data">
        <h3 :class="$style.detail_title">
          {{
            result.original_title ? result.original_title : result.original_name
          }}
        </h3>
        <div :class="$style.detail_box">
          <span>{{
            result.release_date
              ? result.release_date.substring(0, 4)
              : result.first_air_date.substring(0, 4)
          }}</span>
          <span :class="$style.divider">·</span>
          <span
            >{{
              result.runtime ? result.runtime : result.episode_run_time[0]
            }}
            min</span
          >
          <span :class="$style.divider">·</span>
          <span v-for="(genre, index) in result.genres" :key="genre.id">{{
            index === result.genres.length - 1 ? genre.name : `${genre.name} / `
          }}</span>
        </div>
        <p :class="$style.detail_description">{{ result.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { moviesApi, tvapi } from "@/utils/api";
import { BG_IMAGE_PATH, ROUTES } from "@/utils/constants";
import { ResultType } from "@/utils/types/DetailTyps";
import { defineComponent, Ref } from "@vue/runtime-core";
import { AxiosResponse } from "axios";
import { NavigationFailure, RouteLocationNormalizedLoaded } from "vue-router";

export default defineComponent({
  name: "Detail",
  data() {
    return {
      result: null as null | ResultType,
      error: null as null | string,
      loading: true as boolean,
      currentPath: this.$router
        .currentRoute as Ref<RouteLocationNormalizedLoaded>,
      baseImgPath: BG_IMAGE_PATH as string,
    };
  },
  methods: {
    async fetchDetail() {
      const detailId = Number(this.id);
      try {
        const isMovie = this.currentPath.path.includes(ROUTES.movie);
        if (isMovie) {
          const { data }: AxiosResponse<ResultType> =
            await moviesApi.movieDetail(detailId);
          this.result = data;
        } else {
          const { data }: AxiosResponse<ResultType> = await tvapi.showDetail(
            detailId
          );
          this.result = data;
        }
      } catch {
        this.error = "Can't find a result.";
        console.log(this.error);
      } finally {
        if (this.result) {
          this.loading = false;
        }
      }
    },
    preFetchCheck(
      paramId: string | undefined
    ): Promise<void | NavigationFailure | undefined> | undefined {
      if (isNaN(Number(paramId))) return this.$router.push(ROUTES.home);
      return this.fetchDetail();
    },
  },
  props: {
    id: String,
  },
  created() {
    this.preFetchCheck(this.id);
  },
});
</script>

<style lang="less" module>
.detail_container {
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;

  .back_drop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
  }

  .detail_contents {
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
    border-radius: 5px;

    .poster {
      width: 30%;
      height: 100%;
      background-position: center center;
      background-size: cover;
    }

    .detail_data {
      width: 70%;
      margin-left: 10px;

      h3 {
        font-size: 32px;
      }

      .detail_box {
        margin: 20px 0;

        .divider {
          margin: 0px 10px;
        }
      }

      .detail_description {
        font-size: 12px;
        opacity: 0.7;
        line-height: 1.5;
        width: 50%;
      }
    }
  }
}
</style>

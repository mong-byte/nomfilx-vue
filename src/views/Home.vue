<template>
  <div v-if="!loading" :class="$style.home_container">
    <Section title="Now Playing" v-if="movieData.nowPlaying">
      <template v-slot:contents>
        <Poster
          v-for="movie in movieData.nowPlaying"
          :key="movie.id"
          :id="movie.id"
          :imageUrl="movie.poster_path"
          :title="movie.original_title"
          :rating="movie.vote_average"
          :year="movie.release_date.substring(0, 4)"
          :isMovie="true"
        />
      </template>
    </Section>
    <Section title="Upcoming" v-if="movieData.upcoming">
      <template v-slot:contents>
        <Poster
          v-for="movie in movieData.upcoming"
          :key="movie.id"
          :id="movie.id"
          :imageUrl="movie.poster_path"
          :title="movie.original_title"
          :rating="movie.vote_average"
          :year="movie.release_date.substring(0, 4)"
          :isMovie="true"
        />
      </template>
    </Section>
    <Section title="Popular" v-if="movieData.popular">
      <template v-slot:contents>
        <Poster
          v-for="movie in movieData.popular"
          :key="movie.id"
          :id="movie.id"
          :imageUrl="movie.poster_path"
          :title="movie.original_title"
          :rating="movie.vote_average"
          :year="movie.release_date.substring(0, 4)"
          :isMovie="true"
        />
      </template>
    </Section>
  </div>
  <Loader v-else />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { HomeTypes, movieTypes } from "@/utils/types/HomeTypes";
import { moviesApi } from "@/utils/api";
import Section from "@/components/Section.vue";
import Poster from "@/components/Poster.vue";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "Home",

  setup() {
    const state = reactive({
      movieData: {
        nowPlaying: null,
        upcoming: null,
        popular: null,
      } as movieTypes,
      error: null as null | string,
      loading: true as boolean,
    });

    const { movieData, error, loading } = toRefs(state);

    const fetchMovieData = async () => {
      try {
        const {
          data: { results: nowPlaying },
        }: { data: { results: HomeTypes[] } } = await moviesApi.nowPlaying();
        const {
          data: { results: upcoming },
        }: { data: { results: HomeTypes[] } } = await moviesApi.upcomming();
        const {
          data: { results: popular },
        }: { data: { results: HomeTypes[] } } = await moviesApi.popular();
        movieData.value = { nowPlaying, upcoming, popular };
      } catch {
        error.value = "Can't find movies information.";
      } finally {
        const { nowPlaying, upcoming, popular } = toRefs(state.movieData);
        if (nowPlaying && upcoming && popular) {
          loading.value = false;
        }
      }
    };

    onMounted(() => {
      fetchMovieData();
    });

    watch(
      () => state.error,
      () => alert(state.error)
    );

    return { movieData, error, loading };
  },
  components: {
    Section,
    Poster,
    Loader,
  },
});
</script>

<style lang="less" module>
.home_container {
  padding: 0px 20px;
  margin-top: 20px;
}
</style>

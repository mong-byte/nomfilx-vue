<template>
  <div :class="$style.search_container">
    <form :class="$style.search_form" @submit="preSearchCheck">
      <input
        type="text"
        :value="term"
        @input="updateTerm"
        placeholder="Search Movies or TV Shows..."
      />
    </form>
    <Loader v-if="loading" />
    <Section title="Movie Result" v-if="seachResult.movieResults && !loading">
      <template v-slot:contents>
        <Poster
          v-for="movie in seachResult.movieResults"
          :key="movie.id"
          :id="movie.id"
          :imageUrl="movie.poster_path"
          :title="movie.original_title"
          :rating="movie.vote_average"
          :year="movie.release_date?.substring(0, 4)"
          :isMovie="true"
        />
      </template>
    </Section>
    <Section title="TV Result" v-if="seachResult.tvResults && !loading">
      <template v-slot:contents>
        <Poster
          v-for="show in seachResult.tvResults"
          :key="show.id"
          :id="show.id"
          :imageUrl="show.poster_path"
          :title="show.original_name"
          :rating="show.vote_average"
          :year="show.first_air_date?.substring(0, 4)"
          :isMovie="false"
        />
      </template>
    </Section>
  </div>
</template>

<script lang="ts">
import { moviesApi, tvapi } from "@/utils/api";
import { HomeTypes } from "@/utils/types/HomeTypes";
import { TvDataTypes } from "@/utils/types/TvTypes";
import { defineComponent } from "@vue/runtime-core";
import { SearchStateTypes } from "@/utils/types/SearchDataTypes";
import Section from "@/components/Section.vue";
import Poster from "@/components/Poster.vue";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "Search",
  data() {
    return {
      seachResult: {
        movieResults: null,
        tvResults: null,
      } as SearchStateTypes,
      term: "" as string,
      error: null as null | string,
      loading: false as boolean,
    };
  },
  methods: {
    preSearchCheck(event: Event) {
      event.preventDefault();
      if (this.term) {
        this.fetchSearchData(this.term);
        this.term = "";
      }
    },
    updateTerm(event: Event) {
      const target = event.target as HTMLInputElement;
      this.term = target.value;
    },
    async fetchSearchData(term: string) {
      this.loading = true;
      try {
        const {
          data: { results: movieResults },
        }: { data: { results: HomeTypes[] } } = await moviesApi.search(term);
        const {
          data: { results: tvResults },
        }: { data: { results: TvDataTypes[] } } = await tvapi.search(term);
        this.seachResult = { movieResults, tvResults };
      } catch {
        this.error = "Can't find results.";
        console.log(this.error);
      } finally {
        const { movieResults, tvResults } = this.seachResult;
        if (movieResults || tvResults) {
          this.loading = false;
        }
      }
    },
  },
  components: {
    Section,
    Poster,
    Loader,
  },
});
</script>

<style lang="less" module>
.search_container {
  padding: 0px 20px;
  margin-top: 20px;

  .search_form {
    margin-bottom: 50px;
    width: 100%;

    input {
      all: unset;
      font-size: 28px;
      width: 100%;
    }
  }
}
</style>

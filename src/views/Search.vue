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
    <Section title="Movie Result" v-if="searchResult.movieResults && !loading">
      <template v-slot:contents>
        <Poster
          v-for="movie in searchResult.movieResults"
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
    <Section title="TV Result" v-if="searchResult.tvResults && !loading">
      <template v-slot:contents>
        <Poster
          v-for="show in searchResult.tvResults"
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
import { defineComponent, reactive, toRefs, watch } from "vue";
import { SearchStateTypes } from "@/utils/types/SearchDataTypes";
import Section from "@/components/Section.vue";
import Poster from "@/components/Poster.vue";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "Search",
  setup() {
    const state = reactive({
      searchResult: {
        movieResults: null,
        tvResults: null,
      } as SearchStateTypes,
      term: "" as string,
      error: null as null | string,
      loading: false as boolean,
    });

    const { searchResult, term, error, loading } = toRefs(state);

    const fetchSearchData = async (term: string) => {
      loading.value = true;
      try {
        const {
          data: { results: movieResults },
        }: { data: { results: HomeTypes[] } } = await moviesApi.search(term);
        const {
          data: { results: tvResults },
        }: { data: { results: TvDataTypes[] } } = await tvapi.search(term);
        searchResult.value = { movieResults, tvResults };
      } catch {
        error.value = "Can't find results.";
      } finally {
        const { movieResults, tvResults } = toRefs(state.searchResult);
        if (movieResults || tvResults) {
          loading.value = false;
        }
      }
    };

    const preSearchCheck = (event: Event) => {
      event.preventDefault();
      if (term) {
        fetchSearchData(term.value);
        term.value = "";
      }
    };

    const updateTerm = (event: Event) => {
      const target = event.target as HTMLInputElement;
      term.value = target.value;
    };

    watch(
      () => state.error,
      () => alert(state.error)
    );

    return { searchResult, term, error, loading, preSearchCheck, updateTerm };
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

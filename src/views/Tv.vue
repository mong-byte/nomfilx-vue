<template>
  <div v-if="!loading" :class="$style.tv_container">
    <Section title="Top rated" v-if="tvData.topRated">
      <template v-slot:contents>
        <Poster
          v-for="show in tvData.topRated"
          :key="show.id"
          :id="show.id"
          :imageUrl="show.poster_path"
          :title="show.original_name"
          :rating="show.vote_average"
          :year="show.first_air_date.substring(0, 4)"
          :isMovie="false"
        />
      </template>
    </Section>
    <Section title="Popular" v-if="tvData.popular">
      <template v-slot:contents>
        <Poster
          v-for="show in tvData.popular"
          :key="show.id"
          :id="show.id"
          :imageUrl="show.poster_path"
          :title="show.original_name"
          :rating="show.vote_average"
          :year="show.first_air_date.substring(0, 4)"
          :isMovie="false"
        />
      </template>
    </Section>
    <Section title="Airing today" v-if="tvData.airingToday">
      <template v-slot:contents>
        <Poster
          v-for="show in tvData.airingToday"
          :key="show.id"
          :id="show.id"
          :imageUrl="show.poster_path"
          :title="show.original_name"
          :rating="show.vote_average"
          :year="show.first_air_date.substring(0, 4)"
          :isMovie="true"
        />
      </template>
    </Section>
  </div>
  <Loader v-else />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { tvapi } from "@/utils/api";
import { TvDataTypes, TvStateTypes } from "@/utils/types/TvTypes";
import Section from "@/components/Section.vue";
import Poster from "@/components/Poster.vue";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "TV",
  setup() {
    const state = reactive({
      tvData: {
        topRated: null,
        popular: null,
        airingToday: null,
      } as TvStateTypes,
      error: null as null | string,
      loading: true as boolean,
    });

    const { tvData, error, loading } = toRefs(state);

    const fetchTvData = async () => {
      try {
        const {
          data: { results: topRated },
        }: { data: { results: TvDataTypes[] } } = await tvapi.topRated();
        const {
          data: { results: popular },
        }: { data: { results: TvDataTypes[] } } = await tvapi.popular();
        const {
          data: { results: airingToday },
        }: { data: { results: TvDataTypes[] } } = await tvapi.airingToday();
        tvData.value = { topRated, popular, airingToday };
      } catch {
        error.value = "Can't find movies information.";
      } finally {
        const { topRated, popular, airingToday } = toRefs(state.tvData);
        if (topRated && popular && airingToday) {
          loading.value = false;
        }
      }
    };

    onMounted(() => {
      fetchTvData();
    });

    watch(
      () => state.error,
      () => alert(state.error)
    );

    return { tvData, error, loading };
  },
  components: {
    Section,
    Poster,
    Loader,
  },
});
</script>

<style lang="less" module>
.tv_container {
  padding: 0px 20px;
  margin-top: 20px;
}
</style>

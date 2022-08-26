<template>
  <v-app>

      <default-layout>
        <router-view/>
      </default-layout>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import DefaultLayout from '@/views/layout/DefaultLayout.vue';

export default Vue.extend({
  name: 'App',
  components: {
    DefaultLayout,
  },
  data: () => ({
    //
  }),
});
</script>

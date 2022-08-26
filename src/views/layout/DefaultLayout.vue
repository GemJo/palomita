<template>
  <div>
    <v-app-bar
      app
      absolute
      denses
      tag="header"
      class="yellow lighten-1"
    >
      <v-toolbar-title class="corn-font">
        <v-img
          src="@/assets/img/palomita_logo.png"
          width="100"
          class="ml-16 mt-11"
          contain
          height="110"
        />
      </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs centered v-model="tab" class="w-auto horizontal-menu">
          <v-tab
            v-for="section in menu"
            :key="section.id"
            :to="section.id"
            :class="{'horizontal-menu--active': section.id === tab}"
            :ripple="false"
            active-class="secondary--text font-weight-bold"
            @click="goTo(section.id)"
          >
            {{ section.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main class="pt-0 main" tag="main">
      <v-container class="mb-10">
        <slot></slot>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'default-layout',
  computed: {
    menu() {
      return [
        { id: 'home', name: 'Inicio' },
        { id: 'library', name: 'Tu biblioteca' },
      ];
    },
  },
  data() {
    return {
      tab: 'home',
    };
  },
  methods: {
    goTo(routeName) {
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName });
      }
    },
  },
  created() {
    this.$watch(
      () => this.$route.path,
      (newPath) => {
        if (newPath.includes('library')) {
          this.tab = 'library';
          return;
        }
        this.tab = 'home';
      },
    );
  },
};
</script>

<style scoped>

</style>

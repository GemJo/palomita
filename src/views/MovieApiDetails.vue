<template>
  <div v-if="Object.keys(movie).length">
    <v-breadcrumbs
      divider=">"
      :items="breadcrumbs"
      class="px-0"
    >
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :to="item.href"
          :disabled="item.disabled"
        >
          {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <h1 class="corn-font primary--text">
      {{ movie.title }}
    </h1>
    <v-row class="mt-4">
      <v-col cols="12" md="4">
        <v-img
          :src="`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.posterPath}`"
          position="center center"
          class="mb-4"
        />
        <v-row align="center">
          <v-col cols="10">
            <p class="grey--text text--darken-1 mb-0">
              {{ movie.releaseDate }}
            </p>
          </v-col>
          <v-col cols="2" v-if="movie.homepage">
            <v-btn
              icon
              color="primary"
              outlined
              :href="movie.homepage"
              target="_blank"
            >
              <v-icon>
                link
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-chip
              v-for="company in movie.productionCompanies"
              :key="company.id"
              disabled
              small
              class="text-caption ma-1"
            >
              {{ company.name }}
              <span v-if="company.country">({{ company.country }})</span>
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" class="px-0" >
            <v-slide-group
              show-arrows
              class="mb-4"
            >
              <v-slide-item
                v-for="actor in movie.cast"
                :key="actor.id"
                class="mx-2"
              >
                <v-card
                  width="150"
                  class="my-2"
                >
                  <v-img
                    :src="getActorImg(actor.profilePath)"
                    max-height="150"
                    position="center center"
                  />
                  <v-card-text class="pb-2">
                    <p class="subtitle-2 font-weight-bold mb-0">
                      {{ actor.name }} <br>
                      <span class="caption primary--text">
                      ({{ actor.character }})
                  </span>
                    </p>
                  </v-card-text>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-col>
          <v-col cols="6">
            <v-rating
              dense
              color="primary"
              background-color="grey lighten-1"
              half-increments
              readonly
              :value="movie.voteAverage"
            />
          </v-col>
          <v-col cols="6" class="text-right">
            <span
              v-if="movie.adult"
              class="overline error--text"
            >
              +18
            </span>
          </v-col>
          <v-col cols="12">
            <v-chip
              v-for="genre in movie.genres"
              :key="genre"
              color="primary"
              class="font-weight-medium mx-1 secondary--text"
            >
              {{ genre}}
            </v-chip>
          </v-col>
          <v-col cols="12">
            <p
              class="text-no-wrap secondary
              primary--text font-weight-bold overline
              d-inline-block px-2"
            >
              {{ movie.originalTitle }}
            </p>
            <p class="my-6">
              {{ movie.overview }}
            </p>
          </v-col>
          <v-col cols="12">
            <v-divider class="grey lighten-4" />
          </v-col>
          <v-col cols="12" class="team-section">
            <v-row align-content="center">
              <v-col
                v-for="crew in movie.crew"
                :key="crew.id"
                cols="12"
                md="4"
                class="py-4"
              >
                <v-row>
                  <v-col cols="4">
                    <v-avatar
                      width="80"
                      height="80"
                    >
                      <v-img
                        :src="getTeamImg(crew.profilePath)"
                        position="center center"
                      />
                    </v-avatar>
                  </v-col>
                  <v-col cols="8">
                    <p class="mb-1">{{ crew.name }}</p>
                    <v-chip
                      v-for="(job, index) in crew.job"
                      :key="index"
                      x-small
                      class="mx-1"
                    >
                      {{ job }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-divider class="grey lighten-4" />
          </v-col>
        </v-row>
      </v-col>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-fab-transition>
            <v-btn
              color="primary"
              right
              bottom
              rounded
              fixed
              fab
              v-on="on"
              @click="goTo('movie-library-add', { movieId: movie.id})"
            >
              <v-icon color="secondary" class="font-weight-black">
                add
              </v-icon>
            </v-btn>
          </v-fab-transition>
        </template>
        <span>Añadir película</span>
      </v-tooltip>
    </v-row>
  </div>
</template>

<script>
import { retrieveMovieDetails } from '@/infrastructure/application/movie';
import GetMovieQuery from '@/application/movie/query/getMovie/GetMovieQuery';

export default {
  name: 'movie-api-details',
  computed: {
    breadcrumbs() {
      return [
        {
          text: 'Inicio',
          href: '/home',
          disabled: false,
        },
        {
          text: this.movie.title,
          href: '',
          disabled: true,
        },
      ];
    },
  },
  data() {
    return {
      movie: {},
    };
  },
  methods: {
    goTo(name, params) {
      this.$router.push({ name, params });
    },
    async getMovie() {
      const response = await retrieveMovieDetails
        .invoke(new GetMovieQuery(Number(this.$route.params.movieId)));
      if (!response.success) {
        return;
      }

      this.movie = response.movie;
    },
    getActorImg(url) {
      if (!url) {
        return 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg';
      }

      return `https://image.tmdb.org/t/p/w220_and_h330_face/${url}`;
    },
    getTeamImg(url) {
      if (!url) {
        return 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg';
      }

      return `https://image.tmdb.org/t/p/w220_and_h330_face/${url}`;
    },
  },
  beforeMount() {
    this.getMovie();
  },
};
</script>

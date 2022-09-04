<template>
  <div>
    <v-snackbar
      v-model="feedback.show"
      :color="feedback.color"
      top
    >
      {{ feedback.text }}
    </v-snackbar>
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
    <h1>EDIT</h1>
    <h1 class="corn-font primary--text">
      {{ movie.title }}
    </h1>
    <v-row class="mt-4" v-if="Object.keys(movie).length">
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
              <span v-if="company.origin_country">({{ company.origin_country }})</span>
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <label>
                      ¿Que puntuación le das?
                    </label>
                    <v-rating
                      v-model="yourMovie.rating"
                      color="primary"
                      background-color="grey lighten-1"
                      half-increments
                      hover
                      class="mb-6"
                    />
                    <label>
                      ¿La has visto?
                    </label>
                    <div>
                      <v-icon
                        :color="!yourMovie.viewed ? 'primary' : 'grey lighten-2'"
                        class="mb-2"
                        @click="yourMovie.viewed = false"
                      >
                        visibility_off
                      </v-icon>
                      <v-switch
                        v-model="yourMovie.viewed"
                        inset
                        class="d-inline-block mr-1 ml-4 mt-1"
                      />
                      <v-icon
                        :color="yourMovie.viewed ? 'primary' : 'grey lighten-2'"
                        class="mb-2"
                        @click="yourMovie.viewed = true"
                      >
                        visibility
                      </v-icon>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-textarea
                      v-model="yourMovie.comment"
                      rows="5"
                      auto-grow
                      filled
                      label="Añade un comentarios si quieres"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="primary"
                  text
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
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
              {{ genre }}
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
    </v-row>
  </div>
</template>

<script>
import { editYourMovie, retrieveYourMovie } from '@/infrastructure/application/yourMovie';
import GetYourMovieQuery from '@/application/yourMovie/query/getYourMovie/GetYourMovieQuery';
import EditYourMovieCommand
  from '@/application/yourMovie/command/editYourMovie/EditYourMovieCommand';

export default {
  name: 'movie-library-edit',
  computed: {
    breadcrumbs() {
      return [
        {
          text: 'Inicio',
          disabled: false,
          href: '/home',
        },
        {
          text: 'Tu biblioteca',
          disabled: false,
          href: '/your-library',
        },
        {
          text: `Editar: ${this.movie.title}`,
          disabled: true,
          href: '',
        },
      ];
    },
  },
  data() {
    return {
      movie: {},
      yourMovie: {
        rating: 0,
        viewed: false,
        comment: '',
      },
      feedback: {
        show: false,
        color: 'red',
        text: '',
      },
    };
  },
  methods: {
    goTo(name) {
      this.$router.push({ name });
    },
    async getMovie() {
      const response = await retrieveYourMovie
        .invoke(new GetYourMovieQuery(this.$route.params.movieId));

      if (!response.success) {
        return;
      }

      this.movie = response.yourMovie;
      Object.keys(this.yourMovie).forEach((key) => {
        this.yourMovie[key] = this.movie[key];
      });
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
    async save() {
      const response = await editYourMovie.invoke(new EditYourMovieCommand(
        this.movie.id,
        this.yourMovie.rating,
        this.yourMovie.viewed,
        this.yourMovie.comment,
      ));

      this.showFeedBack(response);
      if (!response.success) {
        return;
      }

      this.$router.push({ name: 'library' });
    },
    showFeedBack(response) {
      this.feedback.color = 'success';
      this.feedback.text = 'Bien! Película se ha editado correctamente';

      if (!response.success) {
        this.feedback.color = 'error';
        this.feedback.text = 'Ops! Ha ocurrido un error';
      }

      this.feedback.show = true;
    },
  },
  beforeMount() {
    this.getMovie();
  },
};
</script>

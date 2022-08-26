<template>
  <v-row>
    <v-snackbar
      v-model="feedback.show"
      :color="feedback.color"
      top
    >
      {{ feedback.text }}
    </v-snackbar>
    <v-col cols="12">
      <h1 class="corn-font primary--text mb-5">
        Tu biblioteca
      </h1>
    </v-col>
    <v-col cols="10">
      <v-text-field
        v-model="search"
        placeholder="Buscador..."
        outlined
        append-icon="search"
        rounded
        dense
      />
    </v-col>
    <v-col cols="2" class="text-right">
      <v-spacer/>
      <v-btn
        icon
        :color="showList ? 'primary' : 'grey lighten-2'"
        @click="showList = true"
        class="mr-2"
      >
        <v-icon>
          view_list
        </v-icon>
      </v-btn>
      <v-btn
        icon
        :color="showList ? 'grey lighten-2' : 'primary'"
        @click="showList = false"
      >
        <v-icon>
          dashboard
        </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" v-if="showList">
      <v-data-table
        :items="movies"
        :headers="headers"
        sort-desc
        sort-by="lastUpdate"
      >
        <template v-slot:item.rating="{ item }">
          <v-rating
            small
            :value="item.rating"
            dense
            color="primary"
            background-color="grey lighten-1"
            half-increments
            readonly
          />
        </template>
        <template v-slot:item.viewed="{ item }">
          <v-icon
            v-if="item.viewed"
            color="primary"
          >
            visibility
          </v-icon>
          <v-icon
            v-else
            color="grey lighten-2"
          >
            visibility_off
          </v-icon>
        </template>
        <template v-slot:item.lastUpdate="{ item }">
            {{ item.lastUpdate | date}}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            color="primary"
            @click="$router.push({ name: 'movie-library-edit', params: { movieId: item.id } })"
          >
            <v-icon>
              edit
            </v-icon>
          </v-btn>
          <v-btn
            icon
            color="primary"
            @click="deleteMovie(item.id)"
          >
            <v-icon>
              delete
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="12" v-else>
      <v-row>
        <v-col v-for="movie in movies" :key="movie.id" cols="6" md="3">
          <v-card class="flex-grow-1" min-height="400px">
            <v-img
              :src="`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.posterPath}`"
              gradient="to bottom, transparent, rgba(0,0,0,.75)"
              class="primary--text align-end"
              max-height="200"
              position="center center"
            >
              <v-card-title>
                <p class="subtitle-1 font-weight-bold mb-0">
                  {{ movie.title }}
                  <span class="caption primary--text" v-if="movie.releaseDate">
                      ({{ movie.releaseDate.substr(0,4) }})
                    </span>
                </p>
              </v-card-title>
            </v-img>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" class="caption grey--text text--lighten-1">
                  Última actualización: {{ movie.lastUpdate | date }}
                </v-col>
                <v-col cols="6">
                  <v-rating
                    dense
                    color="primary"
                    background-color="grey lighten-1"
                    half-increments
                    readonly
                    :value="movie.rating"
                  />
                </v-col>
                <v-col cols="12">
                  <v-chip-group
                    column
                  >
                    <v-chip
                      v-for="genre in movie.genreIds"
                      :key="genre"
                      disabled
                      x-small
                      class="text-caption mx-1"
                    >
                      {{ getName(genre) }}
                    </v-chip>
                  </v-chip-group>
                </v-col>
                <v-col cols="12">
                  <p class="reduce_text">{{ movie.overview }}</p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="mt-5">
                <span
                  v-if="movie.adult"
                  class="overline error--text"
                  style="position: absolute;bottom: 10px;left: 20px;"
                >
                  +18
                </span>
              <v-spacer/>
              <v-btn
                icon
                color="primary"
                @click="$router.push({ name: 'movie-library-edit', params: { movieId: movie.id } })"
              >
                <v-icon>
                  edit
                </v-icon>
              </v-btn>
              <v-btn
                icon
                color="primary"
                @click="deleteMovie(movie.id)"
              >
                <v-icon>
                  delete
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: 'library',
  computed: {
    headers() {
      return [
        {
          text: 'Película',
          value: 'title',
          sortable: true,
          align: 'start',
        },
        {
          text: 'Director',
          value: 'director',
          sortable: true,
          align: 'start',
        },
        {
          text: 'Puntuación',
          value: 'rating',
          sortable: true,
          align: 'center',
        },
        {
          text: 'Vista',
          value: 'viewed',
          sortable: true,
          align: 'center',
        },
        {
          text: 'Última actulización',
          value: 'lastUpdate',
          sortable: true,
          align: 'center',
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
          align: 'end',
        },
      ];
    },
    genresNames() {
      return [
        { key: 'adventure', name: 'Aventura' },
        { key: 'fantasy', name: 'Fantasía' },
        { key: 'animation', name: 'Animación' },
        { key: 'drama', name: 'Drama' },
        { key: 'horror', name: 'Terror' },
        { key: 'action', name: 'Acción' },
        { key: 'comedy', name: 'Comedia' },
        { key: 'history', name: 'Historia' },
        { key: 'western', name: 'Western' },
        { key: 'thriller', name: 'Suspense' },
        { key: 'crime', name: 'Crimen' },
        { key: 'documentary', name: 'Documental' },
        { key: 'science_fiction', name: 'Ciencia ficción' },
        { key: 'mystery', name: 'Misterio' },
        { key: 'music', name: 'Música' },
        { key: 'romance', name: 'Romance' },
        { key: 'family', name: 'Familia' },
        { key: 'war', name: 'Bélica' },
        { key: 'tv_movie', name: 'Película de TV' }];
    },
    movies() {
      if (this.search.trim().length < 3) {
        return this.listMovies;
      }
      return this.listMovies
        .filter((movie) => movie.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
          .includes(this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()));
    },
  },
  data() {
    return {
      listMovies: [],
      feedback: {
        show: false,
        color: 'red',
        text: '',
      },
      showList: true,
      search: '',
    };
  },
  methods: {
    getMovies() {
      axios.get('http://localhost:8085/api/movies')
        .then((response) => {
          this.listMovies = response.data;
          this.listMovies.forEach((movie, index) => {
            this.listMovies[index].director = movie.crew.find((person) => person.job.includes('Director')).name;
          });
          this.listMovies = this.listMovies.sort((a, b) => (a.lastUpdate > b.lastUpdate ? -1 : 1));
        }).catch((e) => {
          this.feedback.color = 'error';
          this.feedback.text = 'Ha ocurrido un error cargando la libreria';
          this.feedback.show = true;
          console.error(e);
        });
    },
    deleteMovie(id) {
      axios.delete(`http://localhost:8085/api/movie/${id}`)
        .then((response) => {
          this.feedback.color = 'success';
          this.feedback.text = 'Película eliminada correctamente';
          this.feedback.show = true;
          this.getMovies();
        }).catch((e) => {
          console.error(e);
          this.feedback.color = 'error';
          this.feedback.text = 'Ha ocurrido un error al eliminar la película';
          this.feedback.show = true;
        });
    },
    getName(genreId) {
      return this.genresNames.find((genre) => genre.key === genreId).name;
    },
  },
  beforeMount() {
    this.getMovies();
  },
  filters: {
    date: (date) => date.split('T', 1)[0],
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">Capstone</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'About' }"
        >
          <router-link class="nav-link" :to="{ name: 'About' }">About</router-link>
        </li>
      </ul>

      <form
        class="form-inline mr-5"
        @submit.prevent="searchByArtist(),searchByAlbum(),searchBySong()"
      >
        <input
          v-model="search.data"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>

      <span class="navbar-text">
        <button class="btn btn-success" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <button class="btn btn-danger" @click="logout" v-else>logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

let _api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true,
});
export default {
  name: "Navbar",
  data() {
    return {
      search: {},
    };
  },
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile", this.$auth.user);
      console.log("the problem is in login navbar");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    async logout() {
      await this.$auth.logout({ returnTo: window.location.origin });
    },
    searchByArtist() {
      this.$store.dispatch("searchByArtist", {
        data: this.search.data,
      });
    },
    searchByAlbum() {
      this.$store.dispatch("searchByAlbum", {
        data: this.search.data,
      });
    },
    searchBySong() {
      this.$store.dispatch("searchBySong", {
        data: this.search.data,
      });
    },
  },
};
</script>

<style></style>

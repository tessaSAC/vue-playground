<script>
// v-click-outside can go on either the portal entry point or the portal itself
// idky this doesn't work if I add it via main.js instead >:(
import vClickOutside from 'v-click-outside'

import { mapGetters, mapMutations } from 'vuex'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },

  computed: {
    ...mapGetters([ 'modalFocusedIsOpen' ])
  },

  methods: {
    ...mapMutations({ closeModalFocused: 'toggleModalFocused' }),
  }
}
</script>

<template>
  <v-app id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/form">Form</router-link> |
      <router-link to="/visualizations">Visualizations</router-link> |
      <router-link to="/event">Event</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>

    <div v-if="modalFocusedIsOpen" v-click-outside="closeModalFocused" id="portalTarget" />
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#portalTarget {
  position: absolute;
  top: 20vh;
  left: 30vw;
  width: 40vw;
  height: 50vh;
  background: white;
  border: 1px solid coral;
  border-radius: 4px;
  display: grid;
  place-items: center;
  transform-style: preserve-3d;

  &::after {
    content: '';
    width: 100vw;
    height: 90vh;  //  total vh - 'outside vue...' height
    background: rgba(50, 80, 200, 0.4);
    pointer-events: none;
    position: absolute;
    transform: translateZ(-1px);
  }
}
</style>

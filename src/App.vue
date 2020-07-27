<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters([ 'modalFocusedIsOpen' ]),
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

    <template v-if="modalFocusedIsOpen">
      <div class="scrim" @click="closeModalFocused">
        <div  
          id="portalTarget"
          ref="modalFocused"
          class="modalFocused"
          :style="modalFocusedPosition"
        >
          <resize-observer @notify="centerModal" />
        </div>
      </div>
    </template>
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

.scrim {
  z-index: 1; // modal stays above checkboxes, etc.
  position: absolute;
  background: rgba(50, 80, 200, 0.4);

  height: 90vh;  //  total vh - 'outside vue...' height
  width: 100vw;


  display: grid;
  place-items: center;

  .modalFocused {
    border: 1px solid coral;
    border-radius: 4px;
    background: white;

    min-height: 200px;
    min-width: 300px;

    display: grid;
    place-items: center;
  }
}
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: _ => ({
    height: 0,
    width: 0,
  }),

  computed: {
    ...mapGetters([ 'modalFocusedIsOpen' ]),

    modalFocusedPosition() {
      return {
        top: `calc((90vh - ${ this.height }px) / 2)`,
        left: `calc((100% - ${ this.width }px) / 2)`,  // idky doesn't work with vw
      }
    }
  },

  mounted() {
    const modal = this.$refs.modalFocused
    if(!modal) return

    this.height = modal.clientHeight
    this.width = modal.clientWidth
  },

  methods: {
    ...mapMutations({ closeModalFocused: 'toggleModalFocused' }),

    centerModal({ height, width }) {
      if(!height && !width) return
      this.height = height
      this.width = width
    }
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
      <div class="scrim" @click="closeModalFocused" />
      <div  
        id="portalTarget"
        ref="modalFocused"
        :style="modalFocusedPosition"
      >
        <resize-observer @notify="centerModal" />
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

#portalTarget, .scrim { z-index: 1; }  // modal stays above checkboxes, etc.

#portalTarget {
  transform-style: preserve-3d;
  position: absolute;
  border: 1px solid coral;
  border-radius: 4px;
  background: white;
  min-height: 200px;
  min-width: 300px;
  display: grid;
  place-items: center;
}

.scrim {
    transform: translateZ(-1px);
    position: absolute;
    background: rgba(50, 80, 200, 0.4);
    height: 90vh;  //  total vh - 'outside vue...' height
    width: 100vw;
  }
</style>

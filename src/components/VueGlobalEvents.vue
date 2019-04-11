<script>
import GlobalEvents from 'vue-global-events'

export default {
  components: { GlobalEvents, },

  data: _ => ({
    clickDetected: false,

    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),

  methods: {
    emitOutsideClick(e) {
      if (!this.$el.contains(e.target)) this.$el.dispatchEvent(new Event('click', { ...e, target: this.$el }))
    },
  },
}
</script>

<template>
<div class="VueGlobalEvents" @click="clickDetected = true">
  <GlobalEvents @click="emitOutsideClick" />

  <h1 v-if="clickDetected">clicked!</h1>

  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" :close-on-content-click="false">
        Dropdown
      </v-btn>
    </template>
    <v-list>
      <v-list-tile
        v-for="(item, index) in items"
        :key="index"
      >
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</div>
</template>


<style lang="scss">
.VueGlobalEvents {
  background: tan;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>

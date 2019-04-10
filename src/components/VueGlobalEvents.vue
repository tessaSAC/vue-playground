<script>
import GlobalEvents from 'vue-global-events'

export default {
  components: { GlobalEvents, },

  data: _ => ({ clickDetected: false, }),

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
</div>
</template>


<style lang="scss">
.VueGlobalEvents {
  background: tan;
  height: 30vh;
  color: white;
}
</style>

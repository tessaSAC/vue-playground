<script>
import confetti from 'canvas-confetti'

export default {
  mounted() {
    confetti.create(this.$refs.canvas, { resize: true })
    confetti()
  },
}
</script>

<template>
<div class="About">
  <h1>This is an about page</h1>
  <canvas ref="canvas" class="canvas" />
</div>
</template>

<style lang="scss">
.About {
  background: slateblue;

  .canvas {
    background: cadetblue;
    height: 200px;
    width: 400px;
  }
}
</style>
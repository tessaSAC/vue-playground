<script>
import confetti from 'canvas-confetti'

export default {
  mounted() {
    this.$refs.canvas.getContext('2d').fillSTyle = 'red'
    confetti.create(this.$refs.canvas, { resize: false })
    confetti()
  },
}
</script>

<template>
<div class="About">
  <h1>This is an about page</h1>
  <canvas ref="canvas" width="200" height="200" fillStyle="red" />
</div>
</template>

<style lang="scss">
.About {
  // background: slateblue;
  .canvas {
    background: red;
  }
}
</style>
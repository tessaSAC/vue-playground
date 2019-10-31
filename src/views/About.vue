<script>
import confetti from 'canvas-confetti'

export default {
  mounted() {
    confetti.create(this.$refs.canvas, { resize: true })({
      colors: [ '#ffffff', '#000000' ],
      particleCount: 300,
      origin: { y: 1.1 },
      spread: 360,
      startVelocity: 60,
    })
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
  height: 50vh;

  .canvas {
    background: cadetblue;
    height: 100%;
    width: 100%;
  }
}
</style>
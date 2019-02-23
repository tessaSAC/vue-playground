<script>
// https://vuejs.org/v2/api/#model

export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `checked` as the prop which take the place of `value`
    checked: {
      type: Number,
      default: 0
    }
  },
}
</script>

<template>
<div class="RadioList">
  <my-checkbox v-model="foo" value="some value"></my-checkbox>
</div>
</template>

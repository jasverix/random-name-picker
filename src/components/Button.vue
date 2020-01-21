<template>
  <a :style="{ visibility: visible ? 'visible' : 'hidden' }" @click="onClick">
    <slot />
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
  @Prop({ type: Boolean, default: true })
  public visible!: boolean

  protected onClick () {
    this.$emit('click')
  }
}
</script>

<style lang="scss" scoped>
  a {
    display: inline-block;
    background: green;
    font-size: 24pt;
    padding: 10px;
    width: 400px;
    border: 1px outset white;
    border-radius: 10px;
    color: white;
    font-weight: bold;

    &:active {
      border-style: inset;
    }
  }
</style>

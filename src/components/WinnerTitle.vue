<template>
  <p :style="{ visibility: visible ? 'visible' : 'hidden' }">
    <slot />
  </p>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class WinnerTitle extends Vue {
  @Prop({ type: Boolean, default: true })
  public visible!: boolean
}
</script>

<style scoped>
  p {
    text-align: center;
    color: orange;
    font-size: 45pt;
    font-weight: bold;
    margin-top: 60px;
    margin-bottom: 0;
    padding: 0;
  }
</style>

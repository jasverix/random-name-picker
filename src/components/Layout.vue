<template>
  <div class="layout">
    <div class="title">
      <slot name="title" />
    </div>

    <div class="wrapper">
      <div class="wrapper-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Layout extends Vue {
}
</script>

<style lang="scss">
  .layout > div {
    width: 1000px;
    border-radius: 10px;
    margin: auto;
  }

  div.title {
    text-align: center;
    vertical-align: middle;
    opacity: 0.8;
    border: solid 2px rgba(255, 165, 0, 0.7);
    background: rgba(255,255,255,0.7);
    margin-bottom: 20px;

    padding: 40px;

    h1, input[type=text] {
      font-size: 45pt;
      font-family: Arial sans-serif;
      font-weight: bold;
      color: #031b38;
      text-align: center;
    }

    h1 {
      margin: auto;
    }

    input[type=text] {
      background: transparent;
      border: none;
    }
  }

  div.wrapper {
    text-align: center;
    opacity: 0.8;
    border-radius: 5px;

    margin-top: 40px;
  }

  .wrapper-inner {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    border: solid 3px orange;
    background: #333333;
    position: relative;
    border-radius: 10px;
    padding: 40px;
  }
</style>

import Mousetrap from "mousetrap"
<template>
  <Layout>
    <template #title>
      <h1>{{ title }}</h1>
    </template>

    <div>
      <WinnerTitle>
        Gratulerer!
      </WinnerTitle>
    </div>

    <div class="winner-list">
      <p class="winner-name" v-for="(winner, index) in winners" :key="index">{{ winner }}</p>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import participants from '../store/participants'
import page from '../store/page'

import Layout from '../components/Layout.vue'
import WinnerTitle from '@/components/WinnerTitle.vue'

@Component({
  components: { WinnerTitle, Layout },
})
export default class Winners extends Vue {
  get winners (): string[] {
    return participants.winners
  }

  get title (): string {
    return page.title
  }

  public mounted (): void {
    if (participants.names.length === 0) {
      this.$router.push({
        name: 'participants',
      })
    }
  }
}
</script>

<style lang="scss">
  div.winner-list {
    margin-bottom: 150px;

    p {
      text-align: center;
      color: white;
      font-size: 40pt;
      font-weight: bold;
      height: 1em;
      padding: 2px;
      margin-block-start: 30px;
      margin-top: 0;
      margin-bottom: 15px;
    }
  }
</style>

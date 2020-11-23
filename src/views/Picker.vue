<template>
  <Layout>
    <template #title>
      <h1>{{ title }}</h1>
    </template>

    <div>
      <WinnerTitle :visible="showWinnerTitle">
        Vinneren er
      </WinnerTitle>

      <div class="person-name">
        {{ selectedName }}
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Mousetrap from 'mousetrap'

import page from '@/store/page'
import participants, { isEmpty } from '@/store/participants'
import Layout from '@/components/Layout.vue'
import Button from '@/components/Button.vue'
import { sleep } from '@/utils/sleep'
import WinnerTitle from '@/components/WinnerTitle.vue'

const MAX_TIMEOUT = 1000

@Component({
  components: { WinnerTitle, Button, Layout },
})
export default class Picker extends Vue {
  protected readyToShuffle: boolean = true
  protected showWinnerTitle: boolean = false
  protected selectedName: string = ''

  private timeout: number = 10

  get title (): string {
    return page.title
  }

  get names (): string[] {
    return participants.names
  }

  public mounted (): void {
    if (participants.names.length === 0) {
      this.$router.push({
        name: 'participants',
      })

      return
    }

    window.onbeforeunload = () => 'Do not close!'

    Mousetrap.bind('return', this.startShuffle)
    Mousetrap.bind('esc', this.goBack)
    Mousetrap.bind('w', this.gotoWinners)
  }

  public beforeDestroy () {
    window.onbeforeunload = null

    Mousetrap.unbind('return')
    Mousetrap.unbind('esc')
    Mousetrap.unbind('w')
  }

  goBack () {
    if (!this.readyToShuffle) return

    this.$router.push({
      name: 'participants',
    })
  }

  gotoWinners () {
    if (!this.readyToShuffle) return

    this.$router.push({
      name: 'winners',
    })
  }

  startShuffle (): void {
    if (!this.readyToShuffle) return

    this.timeout = 10
    this.shuffleNames()
  }

  private async shuffleNames (): Promise<void> {
    const names = this.names
    const timeout = this.timeout

    if (names.length > 0) {
      this.readyToShuffle = false

      const index = Math.floor(Math.random() * names.length)
      const name = names[index]

      this.selectedName = name

      if (timeout > MAX_TIMEOUT && name !== '') {
        await sleep(timeout)

        this.showWinnerTitle = true

        delete names[index]
        participants.names = names.filter(n => !isEmpty(n))
        participants.winners.push(name)

        this.readyToShuffle = true
      } else {
        this.showWinnerTitle = false
        this.timeout = Math.round(timeout * 1000 / 900)
        await sleep(this.timeout)

        return this.shuffleNames()
      }
    }
  }
}
</script>

<style lang="scss">
div.person-name {
  text-align: center;
  color: white;
  font-size: 40pt;
  font-weight: bold;
  height: 1em;
  margin-bottom: 160px;
}
</style>

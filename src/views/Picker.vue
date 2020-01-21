<template>
  <Layout>
    <template #title>
      <h1>{{ title }}</h1>
    </template>

    <div>
      <div>
        <Button :visible="showStartButton" @click="startShuffle">
          Start!
        </Button>
      </div>

      <div class="winner-name" :style="{ visibility: showWinnerTitle ? 'visible' : 'hidden' }">
        Vinneren er
      </div>

      <div class="person-name">
        {{ selectedName }}
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import page from '@/store/page'
import participants, { isEmpty } from '@/store/participants'
import Layout from '@/components/Layout.vue'
import Button from '@/components/Button.vue'
import { sleep } from '@/utils/sleep'

const MAX_TIMEOUT = 1000

@Component({
  components: { Button, Layout },
})
export default class Picker extends Vue {
  protected showStartButton: boolean = true
  protected showWinnerTitle: boolean = false
  protected selectedName: string = ''

  private timeout: number = 10

  get title (): string {
    return page.title
  }
  get names (): string[] {
    return participants.names
  }

  public mounted () {
    if (participants.names.length === 0) {
      this.$router.push({
        name: 'participants',
      })
    }
  }

  startShuffle (): void {
    this.timeout = 10
    this.shuffleNames()
  }

  private async shuffleNames (): Promise<void> {
    const names = this.names
    const timeout = this.timeout

    if (names.length > 0) {
      this.showStartButton = false

      const index = Math.floor(Math.random() * names.length)
      const name = names[index]

      this.selectedName = name

      if (timeout > MAX_TIMEOUT && name !== '') {
        await sleep(timeout)

        this.showWinnerTitle = true

        delete names[index]

        participants.names = names.filter(n => !isEmpty(n))

        await sleep(5000)
        this.showStartButton = true
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
  div.winner-name {
    text-align: center;
    color: orange;
    font-size: 45pt;
    font-weight: bold;
    margin-top: 60px;
  }

  div.person-name {
    text-align: center;
    color: white;
    font-size: 40pt;
    font-weight: bold;
    height: 1em;
    margin-bottom: 160px;
  }
</style>

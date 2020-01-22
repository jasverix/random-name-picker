<template>
  <Layout>
    <template #title>
      <input type="text" v-model="page.title" />
    </template>

    <div>
      <div class="description">
        <p style="font-weight: bold; text-align: center">Trykk "Klar" før du viser på storskjerm!</p>
        <ul>
          <li>Her er liste med lodd - en linje per lodd (flere lodd, flere linjer med samme navn)</li>
          <li>Press "Enter" for å starte trekning. Når vinner vises kan man starte neste trekning med "Enter".</li>
          <li>Press "W" for å vise liste over vinnere.</li>
          <li>Press "Esc" for å komme tilbake til denne listen (forsiktig så du ikke sender på storskjerm)</li>
        </ul>
      </div>

      <h2>Deltakere</h2>

      <div>
        <textarea v-model="namesValue" />
      </div>

      <div>
        <Button @click="gotoPicker">Klar</Button>
      </div>
      <div class="reset-winners" v-if="winners.length > 0">
        <p>Det er {{ winners.length }} vinnere allerede</p>
        <Button @click="resetWinners">Tøm vinnere</Button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import page, { PageSettings } from '@/store/page'
import participants, { setNameString } from '@/store/participants'
import Button from '@/components/Button.vue'
import Layout from '@/components/Layout.vue'

@Component({
  components: { Layout, Button },
})
export default class Participants extends Vue {
  public page: PageSettings = page
  public namesValue: string = ''

  get winners (): string[] {
    return participants.winners
  }

  @Watch('namesValue')
  onNamesValueChanged (value: string): void {
    setNameString(value)
  }

  public mounted () {
    let names = participants.names || []
    if (names.length === 0) {
      names = ['one', 'two', 'three']
    }

    this.namesValue = names.join('\n')
  }

  protected gotoPicker (): void {
    this.$router.push({
      name: 'picker',
    })
  }

  protected resetWinners (): void {
    participants.winners = []
  }
}
</script>

<style lang="scss" scoped>
  textarea {
    font-family: Arial, sans-serif;
    font-weight: bold;
    height: 300px;
    width: 400px;
    text-align: left;
    font-size: 14pt;
  }

  div.description {
    background: white;
    text-align: left;
    width: 800px;
    border: 1px solid black;
    font-size: 16pt;
    margin: 10px auto;
    padding: 5px;
  }

  div.reset-winners {
    border-top: 1px solid yellow;

    p {
      font-size: 20pt;
      color: #ff8855;
    }
  }
</style>

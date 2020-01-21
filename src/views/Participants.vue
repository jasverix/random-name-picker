<template>
  <Layout>
    <template #title>
      <input type="text" v-model="page.title" />
    </template>

    <div>
      <h2>Deltakere</h2>

      <div>
        <textarea v-model="namesValue" />
      </div>

      <div>
        <Button @click="gotoPicker">Klar</Button>
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
</style>

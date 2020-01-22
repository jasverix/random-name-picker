<template>
  <div id="app" :style="appStyle">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import page from '@/store/page'

function readFile (file: File): Promise<string> {
  const reader = new FileReader()
  reader.readAsBinaryString(file)

  return new Promise(resolve => {
    reader.onload = ev => resolve(ev && ev.target ? (ev.target as any).result : '')
  })
}

interface Styles {
  [key: string]: string
}

@Component
export default class App extends Vue {
  get title (): string {
    return page.title
  }

  get page () {
    return page
  }

  get appStyle (): Styles {
    const styles: Styles = {}

    if (page.backgroundImageData) {
      const regExp = /(?:\.([^.]+))?$/
      let ext = 'jpg'
      if (page.backgroundImageName) {
        const res = regExp.exec(page.backgroundImageName)
        if (res) ext = res[1]
      }

      if (ext) {
        styles['background-image'] = `url(data:image/${ext};base64,${btoa(page.backgroundImageData)})`
      }
    }

    return styles
  }

  @Watch('title')
  onTitleChanged (value: string): void {
    document.title = value
  }

  mounted () {
    this.onTitleChanged(this.title)

    window.addEventListener('dragover', ev => {
      ev.preventDefault()
      return false
    })
    window.addEventListener('drop', (ev) => {
      ev.preventDefault()
      return false
    })
    this.$el.addEventListener('drop', this.onFileDrop)
  }

  beforeDestroy () {
    this.$el.removeEventListener('drop', this.onFileDrop)
  }

  onFileDrop (ev: Event) {
    ev.preventDefault()
    ev.stopPropagation()

    const dragEvent = ev as DragEvent
    if (!(dragEvent.dataTransfer && dragEvent.dataTransfer.items && dragEvent.dataTransfer.items.length === 1)) return

    const item = dragEvent.dataTransfer.items[0]
    if (item.kind !== 'file') return

    const file = item.getAsFile()
    if (!file) return

    this.setFileToBackground(file)

    return false
  }

  async setFileToBackground (file: File) {
    page.backgroundImageData = await readFile(file)
    page.backgroundImageName = file.name
  }
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    font-family: Arial sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
  }

  #app {
    padding-top: 40px;
    height: 100vh;
    width: 100vw;

    background: url('assets/background.jpg') no-repeat;
    background-size: cover;
  }

  h2 {
    color: white;
  }
</style>

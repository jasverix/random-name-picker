import Vue from 'vue'

export interface PageSettings {
  title: string
  backgroundImageData: string | null
  backgroundImageName: string | null
}

export default Vue.observable({
  title: 'Trekning!',
  backgroundImageData: null,
  backgroundImageName: null,
}) as PageSettings

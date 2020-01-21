import Vue from 'vue'

export interface PageSettings {
  title: string
}

export default Vue.observable({
  title: 'Trekning!',
}) as PageSettings

import Vue from 'vue'

import { debounce } from '@/utils/debounce'

interface Participants {
  names: string[]
  winners: string[]
}

const participants: Participants = Vue.observable({
  names: [],
  winners: [],
})

export const isEmpty = (val: any): boolean => val === '' || val === null || val === undefined

export const setNameString = debounce((nameString: string) => {
  participants.names = nameString.split('\n').filter(n => !isEmpty(n))
}, 500)

export default participants

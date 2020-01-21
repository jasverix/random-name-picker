import Vue from 'vue'

import { debounce } from '@/utils/debounce'

interface Participants {
  names: string[]
}

const participants: Participants = Vue.observable({
  names: [],
})

export const isEmpty = (val: any): boolean => val === '' || val === null || val === void 0

export const setNameString = debounce((nameString: string) => {
  participants.names = nameString.split('\n').filter(n => !isEmpty(n))
}, 500)

export default participants

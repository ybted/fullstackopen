import diagnoses from '../../data/diagnose'

import { Diagnose } from '../types'

const getEntries = (): Diagnose[] => {
  return diagnoses
}

export default {
  getEntries
}
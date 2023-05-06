import patients from '../../data/patients'
import { v1 as uuid } from 'uuid'
import { NonSensitivePatientEntry, Patient, NewPatientEntry } from '../types'

const getEntries = (): Patient[] => {
  return patients
}
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id, 
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }

  patients.push(newPatientEntry)
  return newPatientEntry
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
}
import diaries from '../../data/entries';

import { 
  NonSensitiveDiaryEntry, 
  DiaryEntry,
  NewDiaryEntry,
  Visibility,
  Weather
} from '../types';

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};
const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {

  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
};
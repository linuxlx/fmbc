import { createSelector } from 'reselect'
import { get } from 'lodash'

const getCounter = state => get(state, 'sample.cumulate')
const getMultiple = state => get(state, 'sample.multiple')

export const makeMultiedCounter = createSelector(
  [getCounter, getMultiple],
  (counter, multiple) => counter * multiple,
)

/* eslint-disable no-param-reassign,no-unused-vars */
// import R from 'ramda'
// import Immutable from 'seamless-immutable'
// import { createTransform } from 'redux-persist'
import localForage from 'localforage'
/*

const isImmutable = R.has('asMutable')

const convertToJs = state => state.asMutable({ deep: true })

const fromImmutable = R.when(isImmutable, convertToJs)

const toImmutable = raw => Immutable(raw)

const seamlessImmutableTransform = createTransform(
  (raw) => {
    return fromImmutable(raw)
  },
  (state) => {
    state.mergeDeep = R.identity
    return toImmutable(state)
  },
)
*/

export default {
  storage: localForage,
  blacklist: ['route', 'common', 'routing', 'orderList', 'loading', 'gamePortal', 'persist'],
  // transform: [seamlessImmutableTransform],
}

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as authReducer } from './data/auth/reducer'
import { reducer as settingsReducer } from './data/settings/reducer'
import { reducer as drawerReducer } from './data/drawer/reducer'
import { reducer as progressReducer } from './data/progress/reducer'
import { reducer as timerReducer } from './scenes/Timer/data/timer/reducer'

const appReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  timer: timerReducer,
  progress: progressReducer,
  drawer: drawerReducer,
})

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })

const storeCreator = () => {
  const store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(thunk))
  )
  return store
}

export default storeCreator

/* eslint-disable no-unused-vars */
import storage from '@Redux/storage'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import user from '@Redux/reducers/user'
import dashboard_projects from '@Redux/reducers/dashboard/reducer'
import dashboard_clients from '@Redux/reducers/addclient'
import dashboard_chats from '@Redux/reducers/dashboard/chat/reducer'

const rootReducer = combineReducers({
  dashboard_projects: dashboard_projects,
  dashboard_clients: dashboard_clients,
  dashboard_chats: dashboard_chats,
  user: user,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeWithDevTools())
const persistor = persistStore(store)

export { store, persistor }

import { Dashboard_clients } from '@Redux/reducers/addclient'
import { Dashboard_chats } from '@Redux/reducers/dashboard/chat/reducer'
import { Dashboard_Projects } from '@Redux/reducers/dashboard/reducer'
import { UserReducer } from '@Redux/reducers/user'

export interface Reducers {
  dashboard_projects: Dashboard_Projects
  dashboard_chats: Dashboard_chats
  dashboard_clients: Dashboard_clients
  user: UserReducer
}

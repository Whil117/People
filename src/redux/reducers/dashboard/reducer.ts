export interface Task {
  column_task_id: string
  column_task_title: string
  column_task_description: string
  column_task_value: string
}

export interface Column {
  column_id: string
  column_label: string
  column_color: string
  column_tasks?: Task[]
}

interface AddProject {
  id: string
  title: string
  description: string
  clients: string[]
}

export type Init = {
  id: string
  title: string
  description: string
  clients: string[]
  columns: Column[]
}

export type Dashboard_Projects = ReturnType<any>

const initState: Init[] = []

const TypesReducer = {
  ADD_PROJECT: (state = initState, action: { payload: AddProject }) => {
    return [
      ...state,
      {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        clients: action.payload.clients,
      },
    ]
  },
  ADD_CLIENT_PROJECT: (
    state = initState,
    action: { payload: { id: string; client_id: string } }
  ) => {
    return state.map((project) => {
      if (project.id === action.payload.id) {
        return {
          ...project,
          clients: project.clients
            ? [...project.clients, action.payload.client_id]
            : [action.payload.client_id],
        }
      }
      return project
    })
  },
  DELETE_CLIENT_PROJECT: (
    state = initState,
    action: { payload: { id: string; client_id: string } }
  ) => {
    return state.map((project) => {
      if (project.id === action.payload.id) {
        return {
          ...project,
          clients: project.clients
            ? project.clients.filter(
                (client) => client !== action.payload.client_id
              )
            : [],
        }
      }
      return project
    })
  },

  ADD_PROJECT_COLUMN: (
    state = initState,
    action: { payload: { id: string; column: Column } }
  ) => {
    return state.map((project) => {
      if (project.id === action.payload.id) {
        return {
          ...project,
          columns: project.columns
            ? [...project.columns, action.payload.column]
            : [action.payload.column],
        }
      }
      return project
    })
  },
  DELETE_COLUMN: (
    state = initState,
    action: { payload: { id: string; column_id: string } }
  ) => {
    return state.map((project) => {
      if (project.id === action.payload.id) {
        return {
          ...project,
          columns: project.columns.filter(
            (column) => column.column_id !== action.payload.column_id
          ),
        }
      }
      return project
    })
  },

  DELETE_COLUMN_TASK: (
    state = initState,
    action: { payload: { id: string; column_id: string; task_id: string } }
  ) => {
    return state.map((project) => {
      if (project.id === action.payload.id) {
        return {
          ...project,
          columns: project.columns.map((column) => {
            if (column.column_id === action.payload.column_id) {
              return {
                ...column,
                column_tasks: column?.column_tasks?.filter(
                  (task) => task.column_task_id !== action.payload.task_id
                ),
              }
            }
            return column
          }),
        }
      }
      return project
    })
  },

  ADD_COLUMN_TASK: (
    state = initState,
    action: { payload: { id: string; column_id: string; task: Task } }
  ) => {
    return state.map((project) => {
      if (project.id === action.payload.id) {
        return {
          ...project,
          columns: project.columns.map((column) => {
            if (column.column_id === action.payload.column_id) {
              return {
                ...column,
                column_tasks: column.column_tasks
                  ? [...column.column_tasks, action.payload.task]
                  : [action.payload.task],
              }
            }
            return column
          }),
        }
      }
      return project
    })
  },
  DELETE_PROJECT: (state = initState, action: { payload: string }) => {
    return state.filter((project) => project.id !== action.payload)
  },
}

type Action = {
  type: keyof typeof TypesReducer
  payload: any
}

export const reducer = (state = initState, action: Action) => {
  const { type } = action
  const handler = TypesReducer[type]
  const newState = handler ? handler(state, action) : state
  return newState
}
export default reducer

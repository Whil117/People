/* eslint-disable no-unused-vars */
export type Client = {
  id: string
  name: string
  phone_number: string
  email: string
  address: string
  image: string
}

export const init: Client[] = []

export type Dashboard_clients = ReturnType<typeof reducer>

const TypeReducers = {
  UPDATE_CLIENTS: (_ = init, action: { payload: Client[] }) => {
    return action.payload
  },
  DELETE_CLIENT: (state = init, action: { payload: { id: string } }) => {
    return state.filter((client) => client.id !== action.payload.id)
  },
}

type Action = {
  type: keyof typeof TypeReducers
  payload: any
}
export const reducer = (state = init, action: Action) => {
  const { type } = action
  const handler = TypeReducers[type]
  const newState = handler ? handler(state, action) : state
  return newState
}
export default reducer

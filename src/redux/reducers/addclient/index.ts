export const init = {
  name: '',
  phone_number: '',
  email: '',
  address: '',
  image: '',
}

export type AddClientReducer = ReturnType<typeof reducer>

const TypeReducers = {
  ADD_FIELD: (state = init, action: Action) => ({
    ...state,
    [action.payload.key]: action.payload.value,
  }),
}

type Action = {
  type: keyof typeof TypeReducers
  payload: {
    [key: string]: string
  }
}

export const reducer = (state = init, action: Action) => {
  const { type } = action
  const handler = TypeReducers[type]
  const newState = handler ? handler(state, action) : state
  return newState
}

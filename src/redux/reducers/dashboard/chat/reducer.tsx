export type Chat = {
  chat_id: string
  chat_message: string
}
type Chats = {
  [key: string]: Chat[]
}

const init: Chats = {}
export type Dashboard_chats = ReturnType<typeof reducer>

const TypesReducer = {
  ADD_CHAT: (state: Chats, action: Action) => {
    return {
      ...state,
      [action.payload.chat_client_id]: [
        ...(state[action.payload.chat_client_id] || []),
      ],
    }
  },
  ADD_MESSAGE: (state = init, action: Action) => {
    return {
      ...state,
      [action.payload?.chat_client_id]: [
        ...state[action.payload.chat_client_id],
        action.payload,
      ],
    }
  },
}

type Action = {
  type: keyof typeof TypesReducer
  payload: { chat_client_id: string; chat_id: string; chat_message: string }
}

const reducer = (state: Chats = init, action: Action) => {
  const { type } = action
  const handler = TypesReducer[type]
  const newState = handler ? handler(state, action) : state
  return newState
}
export default reducer

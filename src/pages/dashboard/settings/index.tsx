import { FC } from 'react'
import { useDispatch } from 'react-redux'

interface IProps {}

const Settings: FC<IProps> = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Settings</h1>
      <button
        onClick={() =>
          dispatch({
            type: 'LOGOUT',
          })
        }
      >
        Log out
      </button>
    </div>
  )
}

export default Settings

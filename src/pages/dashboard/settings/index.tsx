import AtomImage from '@Atoms/Image'
import { css } from '@emotion/react'
import { ButtonForm } from '@Styles/global'
import { Reducers } from '@Types/types'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface IProps {}

const Settings: FC<IProps> = () => {
  const user = useSelector((state: Reducers) => state.user)
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Settings</h1>
      <AtomImage
        src={user.user.avatar}
        width={220}
        height={220}
        alt={user.user.username}
      />
      <h2>{user.user.username.toUpperCase()}</h2>
      <p>Create account: {user.user.date}</p>
      <p>ID: {user.user._id}</p>
      <ButtonForm
        customstyle={css`
          color: #fff;
          padding: 10px;
          font-weight: bold;
          border-radius: 10px;
          font-size: 1.5rem;
          background: #dd2d2d;
          border: none;
        `}
        onClick={() =>
          dispatch({
            type: 'LOGOUT',
          })
        }
      >
        Log out
      </ButtonForm>
    </div>
  )
}

export default Settings

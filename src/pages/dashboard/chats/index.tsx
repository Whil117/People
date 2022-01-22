import AtomImage from '@Atoms/Image'
import { css } from '@emotion/react'
import { Wrapper } from '@Styles/global'
import { ContactItemButton } from '@Styles/pages/listcontacts'
import { Reducers } from '@Types/types'
import Link from 'next/link'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface IProps {}

const Chats: FC<IProps> = () => {
  const dashboard_clients = useSelector(
    (state: Reducers) => state.dashboard_clients
  )
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Chats</h1>
      <p>Write a message to your client</p>
      <Wrapper>
        {dashboard_clients.map((item) => (
          <Link
            key={item.id}
            href={{
              pathname: '/dashboard/view/chat/[id]',
              query: { id: item.id },
            }}
            passHref
          >
            <ContactItemButton
              onClick={() => {
                dispatch({
                  type: 'ADD_CHAT',
                  payload: {
                    chat_client_id: item.id,
                  },
                })
              }}
              key={item.id}
              customstyle={css`
                cursor: normal;
                width: 470px;
                padding: 10px;
                margin: 10px;
                h3 {
                  margin: 10px 0;
                }
              `}
            >
              <AtomImage
                src={item.image}
                width={90}
                height={90}
                alt={item.name}
              />
              <Wrapper
                customstyle={css`
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  margin-left: 20px;
                `}
              >
                <h3>{item.name.slice(0, 25)}</h3>
                <p>{item.address.slice(0, 25)}</p>
              </Wrapper>
            </ContactItemButton>
          </Link>
        ))}
      </Wrapper>
    </div>
  )
}

export default Chats

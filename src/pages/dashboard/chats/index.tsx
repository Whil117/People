import Card from '@Components/Contact'
import { Wrapper } from '@Styles/global'
import { Reducers } from '@Types/types'
import Link from 'next/link'
import { FC } from 'react'
import { useSelector } from 'react-redux'

interface IProps {}

const Chats: FC<IProps> = () => {
  const dashboard_clients = useSelector(
    (state: Reducers) => state.dashboard_clients
  )

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
            <a>
              <Card {...{ item }} />
            </a>
          </Link>
        ))}
      </Wrapper>
    </div>
  )
}

export default Chats

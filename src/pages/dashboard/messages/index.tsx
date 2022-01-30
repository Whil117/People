import SvgDynamic from '@Atoms/Svg'
import Card from '@Components/Contact'
import { css } from '@emotion/react'
import { Wrapper } from '@Styles/global'
import { Reducers } from '@Types/types'
import Button from '@Whil/components/Button'
import Div from '@Whil/components/Div'
import Formk from '@Whil/components/Form'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

interface IProps {}

const Messages: FC<IProps> = () => {
  const [show, setShow] = useState(false)
  const [emails, setEmails] = useState<string[]>([])
  const dashboard_clients = useSelector(
    (state: Reducers) => state.dashboard_clients
  )

  const formData = [
    {
      name: 'Title',
      as: 'input',
      id: 'title',
      placeholder: 'Title',
      style: { margin: '10px 0' },
    },
    {
      name: 'Message',
      as: 'textarea',
      id: 'message',
      placeholder: 'Message',
      style: { margin: '10px 0', height: '200px' },
    },
  ]

  return (
    <div>
      <h1>Send a Email</h1>
      {show ? (
        <Div
          styles={{
            flexdirection: 'column',
            alignitems: 'strech',
            justifycontent: 'space-between',
          }}
        >
          <Div
            styles={{
              flexdirection: 'row',
              width: '90%',
              boxshadow: 'aa',
              padding: '0px 20px',
              justifycontent: 'space-between',
            }}
          >
            <div>
              <h3>Add Client</h3>
              <p>List Clients</p>
            </div>
            <div>
              <Button click={() => setShow(!show)} props={{ type: 'default' }}>
                <SvgDynamic href="/icons/cancel" />
              </Button>
            </div>
          </Div>
          <Wrapper
            customstyle={css`
              ${dashboard_clients.filter(
                (client) => !emails?.includes(client.id)
              ).length > 2 &&
              css`
                overflow-y: scroll;
                overflow-x: none;
                height: 300px;
              `}
            `}
          >
            {dashboard_clients
              .filter((client) => !emails?.includes(client.id))
              .map((item) => (
                <Button
                  key={item.id}
                  props={{ type: 'default', style: { boxshadow: 'aa' } }}
                  click={() => {
                    setEmails([...emails, item.id])
                  }}
                >
                  <Card {...{ item }} />
                </Button>
              ))}
          </Wrapper>
        </Div>
      ) : (
        <Button props={{ type: 'add' }} click={() => setShow(!show)}>
          Add Client
        </Button>
      )}
      {dashboard_clients
        .filter((client) => emails?.includes(client.id))
        .map((item) => (
          <Card key={item.id} {...{ item }} />
        ))}
      <Formk
        buttonMessage="Send Email"
        arr={formData}
        submit={(values) =>
          alert(JSON.stringify({ ...values, emails }, null, 2))
        }
      />
    </div>
  )
}

export default Messages

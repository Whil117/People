import AtomImage from '@Atoms/Image'
import SvgDynamic from '@Atoms/Svg'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonForm, LabelWrapper, Wrapper } from '@Styles/global'
import { ChatInputStyle, ChatMessage } from '@Styles/pages/dashboard/view/chat'
import { AddTodoFormError } from '@Styles/pages/Login'
import { Reducers } from '@Types/types'
import idAssignment from '@Utils/id'
import { Form, Formik } from 'formik'
import { NextPageContext } from 'next'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface IProps {
  id: string
}

const FormClient = styled(Form)`
  display: flex;
  width: 80%;
  align-items: center;
`

const ViewChat: FC<IProps> = ({ id }) => {
  const dashboard_clients = useSelector(
    (state: Reducers) =>
      state.dashboard_clients.filter((client) => client.id === id)[0]
  )
  const dashboard_chats = useSelector(
    (state: Reducers) => state.dashboard_chats[id]
  )

  const dispatch = useDispatch()

  const handleSubmit = async (values: { chat_message: string }) => {
    await dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        chat_client_id: id,
        chat_id: idAssignment(45),
        chat_message: values.chat_message,
      },
    })
  }

  return (
    <Wrapper
      customstyle={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 85vh;
        width: 100vw;
      `}
    >
      <Wrapper
        customstyle={css`
          display: flex;
        `}
      >
        <AtomImage
          src={dashboard_clients.image}
          width={120}
          height={120}
          alt={dashboard_clients.name}
        />
        <div>
          <h1>{dashboard_clients.name}</h1>
          <p>{dashboard_clients.address}</p>
        </div>
      </Wrapper>
      <Wrapper
        customstyle={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          width: 68%;
          ${dashboard_chats.length > 4 &&
          css`
            height: 68%;
            overflow-y: scroll;
            overflow-x: hidden;
          `}
        `}
      >
        {dashboard_chats.map((item) => (
          <ChatMessage key={item.chat_id}>
            <p>{item.chat_message}</p>
          </ChatMessage>
        ))}
      </Wrapper>
      <Wrapper>
        <Wrapper
          customstyle={css`
            display: flex;
            align-items: flex-start;
          `}
        >
          <Formik
            initialValues={{ chat_message: '' }}
            validate={(values) => {
              let errors: { [key: string]: string } = {}
              if (!values.chat_message) {
                errors.chat_message = 'chat_message is required'
              }
              return errors
            }}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values)
              resetForm()
            }}
          >
            {({ errors, touched }) => (
              <FormClient>
                <LabelWrapper
                  htmlFor="chat_message"
                  customstyle={css`
                    width: 80%;
                  `}
                >
                  <ChatInputStyle
                    name="chat_message"
                    id="chat_message"
                    placeholder="Type a message"
                  />
                  {errors.chat_message && touched.chat_message && (
                    <AddTodoFormError>{errors.chat_message}</AddTodoFormError>
                  )}
                </LabelWrapper>
                <ButtonForm
                  customstyle={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #1e90ff;
                    padding: 10px;
                    border-radius: 10px;
                    border: none;
                    svg {
                      path {
                        stroke: #fff;
                      }
                    }
                  `}
                  type="submit"
                >
                  <SvgDynamic href="/icons/send" />
                </ButtonForm>
              </FormClient>
            )}
          </Formik>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      id: context.query.id,
    },
  }
}

export default ViewChat

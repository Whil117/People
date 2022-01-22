import AtomImage from '@Atoms/Image'
import SvgDynamic from '@Atoms/Svg'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonForm, LabelWrapper, Wrapper } from '@Styles/global'
import { ContactItem } from '@Styles/pages/listcontacts'
import { AddTodoFormError, AddTodoFormInput } from '@Styles/pages/Login'
import { Reducers } from '@Types/types'
import { Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const FormClient = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 600px;
  justify-content: space-between;
`

interface IProps {}

const Messages: FC<IProps> = () => {
  const [show, setShow] = useState(false)
  const [emails, setEmails] = useState<string[]>([])
  const dashboard_clients = useSelector(
    (state: Reducers) => state.dashboard_clients
  )

  return (
    <div>
      <h1>Send a Email</h1>
      <Formik
        initialValues={{
          title: '',
          description: '',
          emails: emails,
        }}
        validate={(values) => {
          const errors: any = {}
          if (!values.title) {
            errors.title = 'Required'
          }
          if (!values.description) {
            errors.description = 'Required'
          }
          if (!values.emails) {
            errors.emails = 'Required'
          }
          return errors
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm()
          setEmails([])
          toast('Message sent! ')
        }}
      >
        {({ errors, touched }) => (
          <FormClient>
            <LabelWrapper htmlFor="title">
              Title
              <AddTodoFormInput
                customstyle={css`
                  width: 94%;
                `}
                name="title"
                id="title"
                type="text"
                placeholder="Enter a title"
              />
              {errors.title && touched.title && (
                <AddTodoFormError>{errors.title}</AddTodoFormError>
              )}
            </LabelWrapper>
            <LabelWrapper
              htmlFor="description"
              customstyle={css`
                margin-top: 20px;
              `}
            >
              Description
              <AddTodoFormInput
                customstyle={css`
                  height: 300px;
                  width: 94%;
                  resize: none;
                  line-height: 1.5;
                `}
                name="description"
                id="description"
                as="textarea"
                placeholder="Enter a description"
              />
              {errors.description && touched.description && (
                <AddTodoFormError>{errors.description}</AddTodoFormError>
              )}
            </LabelWrapper>
            <Wrapper
              customstyle={css`
                margin: 20px 0;
              `}
            >
              <LabelWrapper htmlFor="emails">Clients</LabelWrapper>
              {emails.length > 0 && (
                <Wrapper
                  customstyle={css`
                    ${dashboard_clients.filter((client) =>
                      emails?.includes(client.id)
                    ).length > 2 &&
                    css`
                      overflow-y: scroll;
                      overflow-x: none;
                      height: 300px;
                    `}
                  `}
                >
                  {dashboard_clients
                    .filter((client) => emails?.includes(client.id))
                    .map((item) => (
                      <ContactItem key={item?.id}>
                        <AtomImage
                          src={item?.image || 'https://via.placeholder.com/150'}
                          width={90}
                          height={90}
                          alt={item?.name}
                        />
                        <Wrapper
                          customstyle={css`
                            margin-left: 20px;
                          `}
                        >
                          <h4>{item?.name?.slice(0, 25)}</h4>
                          <p>{item?.address?.slice(0, 38)}</p>
                        </Wrapper>
                      </ContactItem>
                    ))}
                </Wrapper>
              )}
              {errors.emails && touched.emails && (
                <AddTodoFormError>{errors.emails}</AddTodoFormError>
              )}
            </Wrapper>
            {show ? (
              <Wrapper
                customstyle={css`
                  display: flex;
                  flex-direction: column;
                  h3,
                  p {
                    margin-bottom: 5px;
                  }
                `}
              >
                <Wrapper
                  customstyle={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  `}
                >
                  <div>
                    <h3>Add Client</h3>
                    <p>List Clients</p>
                  </div>
                  <div>
                    <ButtonForm
                      onClick={() => setShow(!show)}
                      customstyle={css`
                        cursor: pointer;
                        border: none;
                        background: transparent;
                      `}
                    >
                      <SvgDynamic href="/icons/cancel" />
                    </ButtonForm>
                  </div>
                </Wrapper>
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
                      <ButtonForm
                        key={item.id}
                        customstyle={css`
                          border: none;
                          background: none;
                          margin: 10px 0;
                          padding: 0;
                        `}
                        onClick={() => {
                          setEmails([...emails, item.id])
                        }}
                      >
                        <ContactItem
                          key={item?.id}
                          customstyle={css`
                            margin: 0;
                          `}
                        >
                          <AtomImage
                            src={
                              item?.image || 'https://via.placeholder.com/150'
                            }
                            width={90}
                            height={90}
                            alt={item?.name}
                          />
                          <Wrapper
                            customstyle={css`
                              margin-left: 20px;
                            `}
                          >
                            <h4>{item?.name?.slice(0, 25)}</h4>
                            <p>{item?.address?.slice(0, 38)}</p>
                          </Wrapper>
                        </ContactItem>
                      </ButtonForm>
                    ))}
                </Wrapper>
              </Wrapper>
            ) : (
              <ButtonForm
                customstyle={css`
                  border: none;
                  width: 600px;
                  height: 35px;
                  background: #ff651e;
                  color: white;
                  font-weight: 600;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                  border-radius: 5px;
                  width: 100%;
                  margin-bottom: 20px;
                `}
                onClick={() => setShow(!show)}
              >
                Add Client
              </ButtonForm>
            )}
            <ButtonForm
              customstyle={css`
                border: none;
                width: 274px;
                height: 35px;
                background: #1e90ff;
                color: white;
                font-weight: 600;
                box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                border-radius: 5px;
                width: 100%;
              `}
              type="submit"
            >
              Submit
            </ButtonForm>
          </FormClient>
        )}
      </Formik>
    </div>
  )
}

export default Messages

import { baseUrl } from '@Assets/backend'
import AtomImage from '@Atoms/Image'
import SvgDynamic from '@Atoms/Svg'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonForm, Wrapper } from '@Styles/global'
import { ContactItem } from '@Styles/pages/listcontacts'
import { AddTodoFormInput } from '@Styles/pages/Login'
import axios from 'axios'
import { Form, Formik } from 'formik'
import Cookies from 'js-cookie'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'

type ContactItem = {
  id: string
  name: string
  email: string
  phone_number: string
  address: string
  image: string
}

const FormClient = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

interface IProps {
  contacts: {
    clients: ContactItem[]
  }
}

const ListContacts: FC<IProps> = ({ contacts }) => {
  const [list, setList] = useState<ContactItem[]>(contacts?.clients)
  const token = Cookies.get('token')
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000))

  const handleDeleteListItem = async (id: string) => {
    setList(list.filter((item) => item.id !== id))
    try {
      await axios
        .post(
          `${baseUrl}/dashboard/deleteclient`,
          {
            id,
          },
          {
            headers: {
              token: token || '',
            },
          }
        )
        .then((res) => {
          if (res.data) {
            toast.promise(resolveAfter3Sec, {
              pending: 'Pending...',
              success: 'Successful 👌',
              error: 'Error 🤯',
            })
          }
        })
    } catch (error) {}
  }

  return (
    <div>
      <h1>List Clients</h1>
      <Formik
        initialValues={{ q: '' }}
        validate={(values) => {
          const errors: any = {}
          if (!values.q) {
            errors.q = 'q is required'
          }
          return errors
        }}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <FormClient>
            <AddTodoFormInput name="q" placeholder="Search a client" />
            {list
              ?.filter((item) =>
                item.name.toLowerCase().includes(values.q.toLowerCase())
              )
              .map((item) => (
                <Wrapper
                  key={item.id}
                  customstyle={css`
                    display: flex;
                    align-items: center;
                  `}
                >
                  <Link
                    href={{
                      pathname: '/dashboard/viewcontact/[id]',
                      query: {
                        id: item.id,
                      },
                    }}
                    passHref
                  >
                    <ContactItem key={item.id}>
                      <AtomImage
                        src={item.image}
                        width={90}
                        height={90}
                        alt={item.name}
                      />
                      <Wrapper
                        customstyle={css`
                          margin-left: 20px;
                        `}
                      >
                        <h4>{item.name.slice(0, 25)}</h4>
                        <p>{item.address.slice(0, 38)}</p>
                      </Wrapper>
                    </ContactItem>
                  </Link>
                  <ButtonForm
                    customstyle={css`
                      border: none;
                      cursor: pointer;
                      background: transparent;
                    `}
                    onClick={() => handleDeleteListItem(item.id)}
                  >
                    <SvgDynamic href="/icons/trash" />
                  </ButtonForm>
                </Wrapper>
              ))}
          </FormClient>
        )}
      </Formik>
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const token = context?.req?.headers.cookie
  const getListContacts = await axios
    .get(`${baseUrl}/dashboard/viewclient`, {
      headers: {
        'Content-Type': 'application/json',
        token: token?.slice(6) || '',
      },
    })
    .then((res) => {
      return res.data
    })

  return {
    props: {
      contacts: getListContacts,
    },
  }
}

export default ListContacts

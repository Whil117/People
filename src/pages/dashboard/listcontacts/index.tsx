import { baseUrl } from '@Assets/backend'
import SvgDynamic from '@Atoms/Svg'
import Card from '@Components/Contact'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Wrapper } from '@Styles/global'
import { ContactItem } from '@Styles/pages/listcontacts'
import { AddTodoFormInput } from '@Styles/pages/Login'
import { Reducers } from '@Types/types'
import Button from '@Whil/components/Button'
import axios from 'axios'
import { Form, Formik } from 'formik'
import Cookies from 'js-cookie'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000))

  const dashboard_clients = useSelector(
    (state: Reducers) => state.dashboard_clients
  )

  const dispatch = useDispatch()

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
              token: Cookies.get('token') || '',
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
  useEffect(() => {
    if (JSON.stringify(dashboard_clients) !== JSON.stringify(list)) {
      dispatch({
        type: 'UPDATE_CLIENTS',
        payload: list,
      })
    }
  }, [])

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
                    <a>
                      <Card item={item} />
                    </a>
                  </Link>
                  <Button
                    props={{ type: 'default' }}
                    click={() => handleDeleteListItem(item.id)}
                  >
                    <SvgDynamic href="/icons/trash" />
                  </Button>
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

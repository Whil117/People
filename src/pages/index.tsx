import { baseUrl } from '@Assets/backend'
import { css } from '@emotion/react'
import colors from '@Styles/global/colors'
import * as S from '@Styles/pages/Login'
import Formk from '@Whil/components/Form'
import axios from 'axios'
import Cookie from 'js-cookie'
import { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const LoginPage: NextPage = () => {
  const dispatch = useDispatch()
  const handleSubmit = async (values: { [x: string]: string | File }) => {
    await axios
      .post(`${baseUrl}/signin`, values)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Logged Successful 👌')
          setTimeout(() => {
            dispatch({
              type: 'SIGNIN',
              payload: {
                user: res.data.user,
              },
            })
            Cookie.set('token', res.data.token)
          }, 1500)
        }
      })
      .catch(() => {
        toast.error('Login Failed')
      })
  }

  const dataForm = [
    {
      name: 'username',
      as: 'input',
      id: 'username',
      placeholder: 'Username',
      style: { margin: '10px 0' },
    },
    {
      name: 'password',
      as: 'input',
      id: 'password',
      placeholder: 'Password',
      style: { margin: '10px 0' },
    },
  ]

  return (
    <S.AddTodoFormWrapper
      customstyle={css`
        display: flex;
        width: 100%;
        justify-content: center;
        height: 100vh;
        color: ${colors.black};
      `}
    >
      <S.AddTodoFormWrapper
        customstyle={css`
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
        `}
      >
        <div>
          <h1>Welcome to back!</h1>
          <S.LoginPageText
            customstyle={css`
              opacity: 0.75;
              font-size: 1.1rem;
            `}
          >
            Welcome back! Please enter your details
          </S.LoginPageText>
          <Formk arr={dataForm} submit={handleSubmit} buttonMessage="Sign in" />
        </div>
      </S.AddTodoFormWrapper>

      <S.AddTodoFormWrapper
        customstyle={css`
          @media (max-width: 1096px) {
            display: none;
          }
          span {
            width: 657px;
          }
        `}
      >
        <img src="/images/background.png" alt="background" loading="lazy" />
      </S.AddTodoFormWrapper>
    </S.AddTodoFormWrapper>
  )
}

export default LoginPage

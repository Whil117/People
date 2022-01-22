import Redirect from '@Components/Redirect'
import { Reducers } from '@Types/types'
import Cookies from 'js-cookie'
import { NextRouter } from 'next/router'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { invalidPages } from '../index'

interface IProps {
  router: NextRouter
}

const AuthLayout: FC<IProps> = ({ children, router }) => {
  const protectedRoutes = [
    '/dashboard',
    '/dashboard/viewcontact/[id]',
    '/dashboard/listcontacts',
    '/dashboard/addcontact',
    '/dashboard/chats',
    '/dashboard/messages',
    '/dashboard/view/chat/[id]',
    '/dashboard/view/project/[id]',
    '/dashboard/settings',
  ]
  const authethicated = useSelector(
    (state: Reducers) => state.user.authenticated
  )
  const dispatch = useDispatch()

  if (
    (!authethicated && protectedRoutes.includes(router.pathname)) ||
    (authethicated && !Cookies.get('token'))
  ) {
    dispatch({
      type: 'LOGOUT',
    })
    return <Redirect {...{ router }} href="/" />
  }

  if (authethicated && invalidPages.includes(router.pathname)) {
    return <Redirect {...{ router }} href="/dashboard" />
  }
  return <>{children}</>
}

export default AuthLayout

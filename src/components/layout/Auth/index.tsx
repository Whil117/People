import Redirect from '@Components/Redirect'
import { Reducers } from '@Types/types'
import { NextRouter } from 'next/router'
import { FC } from 'react'
import { useSelector } from 'react-redux'
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
    '/dashboard/settings',
  ]
  const authethicated = useSelector(
    (state: Reducers) => state.user.authenticated
  )

  if (!authethicated && protectedRoutes.includes(router.pathname)) {
    return <Redirect {...{ router }} href="/" />
  }

  if (authethicated && invalidPages.includes(router.pathname)) {
    return <Redirect {...{ router }} href="/dashboard" />
  }
  return <>{children}</>
}

export default AuthLayout

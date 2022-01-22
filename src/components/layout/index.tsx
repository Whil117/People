import Navbar from '@Components/Navbar'
import styled from '@emotion/styled'
import { Iprops } from '@Types/components/layout/types'
import { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const WrapperStyled = styled.div`
  display: flex;
  margin: 40px auto 100px 310px;
`

export const invalidPages = ['/', '/auth', '/register']
const Layout: FC<Iprops> = ({ children, router }) => {
  return (
    <>
      <ToastContainer />
      {!invalidPages.includes(router.pathname) ? (
        <>
          <Navbar />
          <WrapperStyled>{children}</WrapperStyled>
        </>
      ) : (
        children
      )}
    </>
  )
}

export default Layout

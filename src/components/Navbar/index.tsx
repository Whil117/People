import SvgDynamic from '@Atoms/Svg'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { customStyleProps } from '@Styles/global'
import Link from 'next/link'
import { FC } from 'react'

interface IProps {}

const WrapperStyled = styled.nav`
  width: 155px;
  height: 92%;
  /* background: #fbfbfb; */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0 15px 15px 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  padding: 40px;
`

const Wrapper = styled.div`
  ${({ customstyle }: customStyleProps) => customstyle}
`
const options = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: '/dashboard',
  },
  {
    name: 'Add Client',
    icon: 'addclient',
    path: '/dashboard/addcontact',
  },
  {
    name: 'All Clients',
    icon: 'listclient',
    path: '/dashboard/listcontacts',
  },
  {
    name: 'Settings',
    icon: 'settings',
    path: '/dashboard/settings',
  },
]
const Navbar: FC<IProps> = () => {
  return (
    <WrapperStyled>
      <Wrapper
        customstyle={css`
          display: flex;
        `}
      >
        <SvgDynamic href="/icons/people" />
        <h2>People</h2>
      </Wrapper>
      <Wrapper>
        {options.map((item) => (
          <Link
            key={item.name}
            href={{
              pathname: item.path,
            }}
            passHref
          >
            <Wrapper
              customstyle={css`
                display: flex;
                width: 100%;
                cursor: pointer;
                p {
                  margin-left: 10px;
                }
              `}
            >
              <SvgDynamic href={`/icons/${item.icon}`} />
              <p>{item.name}</p>
            </Wrapper>
          </Link>
        ))}
      </Wrapper>
    </WrapperStyled>
  )
}

export default Navbar

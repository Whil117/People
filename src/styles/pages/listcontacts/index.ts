import styled from '@emotion/styled'
import { customStyleProps } from '@Styles/global'

export const ContactItem = styled.div`
  width: 427px;
  display: flex;
  margin: 25px 0;
  height: 90px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
  ${({ customstyle }: customStyleProps) => customstyle}
`

export const ContactItemButton = styled.button`
  width: 427px;
  display: flex;
  margin: 25px 0;
  border: none;
  /* height: 90px; */
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
  ${({ customstyle }: customStyleProps) => customstyle}
`

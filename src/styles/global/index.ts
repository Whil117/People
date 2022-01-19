import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

export type customStyleProps = {
  customstyle?: SerializedStyles
}

export const ButtonForm = styled.button`
  ${({ customstyle }: customStyleProps) => customstyle}
`
export const Wrapper = styled.div`
  ${({ customstyle }: customStyleProps) => customstyle}
`
export const LabelWrapper = styled.label`
  ${({ customstyle }: customStyleProps) => customstyle}
`

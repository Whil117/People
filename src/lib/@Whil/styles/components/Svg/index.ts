import styled from '@emotion/styled'
import Styles from '@Whil/types/styles'

export const SvgWrapper = styled.div<{ style?: Styles }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ style }) => style?.margin || '0'};
`

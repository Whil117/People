import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Styles from '@Whil/types/styles'

export const DivWrapper = styled.div<{ styles?: Styles }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25)
    ${({ styles }) =>
      styles
        ? css`
            line-height: ${styles.lineheight || '14px'};
            display: ${styles.display || 'flex'};
            flex-direction: ${styles.flexdirection || 'column'};
            justify-content: ${styles.justifycontent || 'center'};
            align-items: ${styles.alignitems || 'center'};
            width: ${styles.width || '100%'};
            height: ${styles.height || '100%'};
            padding: ${styles.padding || '10px'};
            font-size: ${styles.fontSize || '16px'};
            font-weight: ${styles.fontWeight || 'normal'};
            border-radius: ${styles.borderRadius || '10px'};
            background: ${styles.background || 'transparent'};
            border: ${styles.border || '0'};
            color: ${styles.color || 'black'};
            object-fit: ${styles.objectfit || 'cover'};
            margin: ${styles.margin || '0'};
            box-shadow: ${styles.boxshadow ||
            '0px 0px 2px rgba(0, 0, 0, 0.25)'};
          `
        : ''};
`

import { FC } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

type customstyle = { customstyle?: SerializedStyles }
interface IProps {
  src: string | any
  alt: string
  width: number
  height: number
  customstyle?: customstyle['customstyle']
}

export const ImageWrapper = styled(Image)<customstyle>`
  object-fit: cover;
  border-radius: 10px;
  ${({ customstyle }) => customstyle}
`

const AtomImage: FC<IProps> = (props) => {
  return (
    <ImageWrapper
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      customstyle={props.customstyle}
    />
  )
}

export default AtomImage

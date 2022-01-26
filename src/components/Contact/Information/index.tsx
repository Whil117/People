import Div from '@Whil/components/Div'
import Styles from '@Whil/types/styles'
import { FC } from 'react'

interface IProps {
  item: {
    [key: string]: string
  }
  styles?: Styles
}

const Information: FC<IProps> = ({ item, styles }) => {
  return (
    <Div {...{ styles }}>
      <h3>{item.title?.slice(0, 25)}</h3>
      <p>{item.text?.slice(0, 25)}</p>
    </Div>
  )
}

export default Information

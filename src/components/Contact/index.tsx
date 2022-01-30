import { Client } from '@Redux/reducers/addclient'
import Div from '@Whil/components/Div'
import Image from '@Whil/components/Image'
import { FC } from 'react'
import Information from './Information'

interface IProps {
  item: Client
}

const Card: FC<IProps> = ({ item }) => {
  return (
    <Div
      styles={{
        flexdirection: 'row',
        alignitems: 'center',
        justifycontent: 'flex-start',
        width: '300px',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
      }}
    >
      <Image
        src={item.image || 'https://via.placeholder.com/300x300'}
        width={90}
        height={90}
        alt={item.name}
      />
      <Information
        item={{ title: item.name, text: item.address }}
        styles={{
          margin: '0px 10px',
          boxshadow: 'aaa',
          justifycontent: 'flex-start',
          alignitems: 'stretch',
        }}
      />
    </Div>
  )
}

export default Card

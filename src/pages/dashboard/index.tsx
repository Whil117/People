/* eslint-disable react/no-unescaped-entities */
import AtomImage from '@Atoms/Image'
import SvgDynamic from '@Atoms/Svg'
import { css } from '@emotion/react'
import { Column, Init } from '@Redux/reducers/dashboard/reducer'
import { Wrapper } from '@Styles/global'
import { ContactItem } from '@Styles/pages/listcontacts'
import { Reducers } from '@Types/types'
import idAssignment from '@Utils/id'
import Button from '@Whil/components/Button'
import Formk from '@Whil/components/Form'
import {
  ArcElement,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Doughnut, PolarArea, Radar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'

ChartJS.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface IProps {}

const Dashboard: FC<IProps> = () => {
  const [show, setShow] = useState(false)
  const dashboard_projects = useSelector(
    (state: Reducers) => state.dashboard_projects
  )
  const dashboard_clients = useSelector(
    (state: Reducers) => state.dashboard_clients
  )
  const user = useSelector((state: Reducers) => state.user)

  const dispatch = useDispatch()
  const data = {
    labels: dashboard_projects.map((item: Init) => item.title) || ['none'],
    datasets: [
      {
        label: '# of Votes',
        data: dashboard_projects.map(
          (item: Init) =>
            item.columns?.map((item) => item?.column_tasks?.length)[0]
        ) ?? [1],
        backgroundColor: dashboard_projects.map(
          (item: Init) =>
            item.columns?.map((item: Column) => item.column_color)[0]
        ) || ['#383838'],

        borderWidth: 1,
      },
    ],
  }
  const data2 = {
    labels: dashboard_projects.map((item: Init) => item.title) || ['none'],
    datasets: [
      {
        label: '# of Votes',
        data: dashboard_projects.map(
          (item: Init) =>
            item.columns?.map((item) => item?.column_tasks?.length)[0]
        ) ?? [1],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }
  const dataFormProject = [
    {
      name: 'title',
      as: 'input',
      id: 'title',
      placeholder: 'Title',
      style: { margin: '10px 0' },
    },
    {
      name: 'description',
      as: 'input',
      id: 'description',
      placeholder: 'Description',
      style: { margin: '10px 0' },
    },
  ]

  return (
    <Wrapper
      customstyle={css`
        display: flex;
      `}
    >
      <Wrapper
        customstyle={css`
          width: 350px;
          margin-right: 50px;
        `}
      >
        <h1>Dashboard</h1>
        <Wrapper
          customstyle={css`
            ${dashboard_projects.length > 3 &&
            css`
              overflow-y: scroll;
              overflow-x: hidden;
              padding: 0 0 0 8px;
              height: 500px;
            `}
          `}
        >
          {dashboard_projects.map((item: Init) => (
            <Link
              key={item.id}
              href={{
                pathname: '/dashboard/view/project/[id]',
                query: { id: item.id },
              }}
              passHref
            >
              <ContactItem
                key={`projects-id=${item.id}`}
                customstyle={css`
                  display: flex;
                  flex-direction: column;
                  padding: 10px;
                  width: 281px;
                  height: 80px;
                  h3 {
                    margin: 10px 0;
                  }
                `}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </ContactItem>
            </Link>
          ))}
        </Wrapper>
        {show ? (
          <>
            <Wrapper
              customstyle={css`
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <h2>Add new project</h2>
              <Button
                props={{ type: 'default', style: { boxshadow: '0px' } }}
                click={() => setShow(false)}
              >
                <SvgDynamic href="/icons/cancel" />
              </Button>
            </Wrapper>
            <Formk
              arr={dataFormProject}
              submit={(values, resetForm) => {
                dispatch({
                  type: 'ADD_PROJECT',
                  payload: {
                    id: idAssignment(40),
                    title: values.title,
                    description: values.description,
                  },
                })
                setShow(false)
                resetForm()
              }}
            />
          </>
        ) : (
          <Button
            props={{
              type: 'add',
              style: { boxshadow: '0px' },
            }}
            click={() => setShow(!show)}
          >
            Add Project
          </Button>
        )}
      </Wrapper>
      <Wrapper>
        <h1>Welcome {user.user.username}!</h1>
        <Wrapper>
          <h2>About</h2>
          <Wrapper>
            <h3>Active Projects</h3>
            <Wrapper
              customstyle={css`
                display: flex;
                width: 400px;
              `}
            >
              <Doughnut data={data} />
              <Radar data={data2} />
              <PolarArea data={data} />
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper>
          <h2>Updated Clients</h2>
          <Wrapper
            customstyle={css`
              display: flex;

              width: 100%;
            `}
          >
            {dashboard_clients
              .filter((client, index) => index > dashboard_clients.length - 4)
              .map((item) => (
                <ContactItem
                  key={item.id}
                  customstyle={css`
                    cursor: normal;
                    width: 360px;
                    padding: 10px;
                    margin: 10px 10px;
                    h3 {
                      margin: 10px 0;
                    }
                  `}
                >
                  <AtomImage
                    src={item.image || 'https://via.placeholder.com/300x300'}
                    width={90}
                    height={90}
                    alt={item.name}
                  />
                  <Wrapper
                    customstyle={css`
                      margin-left: 20px;
                    `}
                  >
                    <h3>{item.name.slice(0, 25)}</h3>
                    <p>{item.address.slice(0, 25)}</p>
                  </Wrapper>
                </ContactItem>
              ))}
            {dashboard_clients.length === 0 && <p>You don't have contacts </p>}
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}

export default Dashboard

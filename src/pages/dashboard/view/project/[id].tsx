import SvgDynamic from '@Atoms/Svg'
import ColumnProject from '@Components/Column'
import Card from '@Components/Contact'
import FormColumn from '@Components/FormColumn'
import { css } from '@emotion/react'
import type { Column, Init } from '@Redux/reducers/dashboard/reducer'
import { Wrapper } from '@Styles/global'
import { Reducers } from '@Types/types'
import idAssignment from '@Utils/id'
import Button from '@Whil/components/Button'
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
import { NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { Pie, Radar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'

ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface IProps {
  id: string
}

const Project: FC<IProps> = ({ id }) => {
  const [show, setShow] = useState(false)
  const dashboard_projects = useSelector(
    (state: Reducers) =>
      state.dashboard_projects.filter((item: Init) => item.id === id)[0]
  )
  const dashboard_clients = useSelector(
    (state: Reducers) => state.dashboard_clients
  )
  const router = useRouter()
  const dispatch = useDispatch()
  const data = {
    labels: dashboard_projects?.columns?.map(
      (item: Column) => item.column_label
    ) || ['none'],
    datasets: [
      {
        label: '# of Votes',
        data: dashboard_projects?.columns?.map((item: Column) =>
          item.column_tasks?.reduce(
            (acc, cur) => acc + Number(cur.column_task_value),
            0
          )
        ) ?? [1],
        backgroundColor: dashboard_projects?.columns?.map(
          (item: Column) => item.column_color
        ) ?? ['#383838'],

        borderWidth: 1,
      },
    ],
  }
  const data2 = {
    labels: dashboard_projects?.columns?.map(
      (item: Column) => item.column_label
    ) || ['none'],
    datasets: [
      {
        label: '# of Votes',
        data: dashboard_projects?.columns?.map((item: Column) =>
          item.column_tasks?.reduce(
            (acc, cur) => acc + Number(cur.column_task_value),
            0
          )
        ) ?? [1],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <Wrapper
      customstyle={css`
        display: flex;
        width: 100%;
        flex-direction: column;
      `}
    >
      <h1>Project {dashboard_projects?.title}</h1>
      <p>{dashboard_projects?.description}</p>
      <Wrapper>
        <h2>Add your sales</h2>
        <p>create your columns and organize your sales</p>

        <Wrapper
          customstyle={css`
            display: flex;
            width: 100%;
            align-items: flex-start;
          `}
        >
          {dashboard_projects?.columns?.map((column: Column, index: number) => (
            <ColumnProject key={column.column_id} {...{ column, id, index }} />
          ))}
          <FormColumn
            initvalues={{ column_label: '', column_color: '' }}
            submit={(values, resetForm, setShow) => {
              dispatch({
                type: 'ADD_PROJECT_COLUMN',
                payload: {
                  id: id,
                  column: {
                    ...values,
                    column_id: idAssignment(45),
                  },
                },
              })
              resetForm()
              setShow(false)
            }}
          />
        </Wrapper>
      </Wrapper>
      <Wrapper
        customstyle={css`
          width: 400px;
        `}
      >
        <h2>Sales chart</h2>
        <Wrapper
          customstyle={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <Pie data={data} />
          <Radar data={data2} />
        </Wrapper>
      </Wrapper>
      <Wrapper
        customstyle={css`
          width: 400px;
          margin: 20px 0;
        `}
      >
        <h4>Our Client</h4>
        <Wrapper>
          {dashboard_clients
            .filter((client) =>
              dashboard_projects?.clients?.includes(client.id)
            )
            .map((item) => (
              <Wrapper
                key={item.id}
                customstyle={css`
                  display: flex;
                  align-items: center;
                  z-index: 1;
                `}
              >
                <Link
                  href={{
                    pathname: '/dashboard/viewcontact/[id]',
                    query: { id: item.id },
                  }}
                  passHref
                >
                  <Wrapper
                    customstyle={css`
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <Card {...{ item }} />
                  </Wrapper>
                </Link>
                <Button
                  click={() => {
                    dispatch({
                      type: 'DELETE_CLIENT_PROJECT',
                      payload: {
                        id,
                        client_id: item.id,
                      },
                    })
                  }}
                  props={{ type: 'default' }}
                >
                  <SvgDynamic href="/icons/cancel" />
                </Button>
              </Wrapper>
            ))}
        </Wrapper>
      </Wrapper>
      {show ? (
        <Wrapper
          customstyle={css`
            display: flex;
            flex-direction: column;
            width: 400px;
            h3,
            p {
              margin-bottom: 5px;
            }
          `}
        >
          <Wrapper
            customstyle={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <div>
              <h3>Add Client</h3>
              <p>List Clients</p>
            </div>
            <div>
              <Button click={() => setShow(!show)} props={{ type: 'default' }}>
                <SvgDynamic href="/icons/cancel" />
              </Button>
            </div>
          </Wrapper>

          {dashboard_clients
            .filter(
              (client) => !dashboard_projects?.clients?.includes(client.id)
            )
            .map((item) => (
              <Button
                key={item.id}
                props={{ type: 'default' }}
                click={() => {
                  setShow(!show)
                  dispatch({
                    type: 'ADD_CLIENT_PROJECT',
                    payload: {
                      id: id,
                      client_id: item.id,
                    },
                  })
                }}
              >
                <Card {...{ item }} />
              </Button>
            ))}
        </Wrapper>
      ) : (
        <Button
          props={{ type: 'add', style: { width: '380px' } }}
          click={() => setShow(!show)}
        >
          Add Client
        </Button>
      )}
      <Button
        props={{ type: 'danger', style: { width: '380px' } }}
        click={() => {
          dispatch({
            type: 'DELETE_PROJECT',
            payload: id,
          })
          router.push('/dashboard')
        }}
      >
        Delete project
      </Button>
    </Wrapper>
  )
}
export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query
  return {
    props: {
      id,
    },
  }
}
export default Project

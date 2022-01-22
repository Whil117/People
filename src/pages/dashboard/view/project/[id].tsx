import AtomImage from '@Atoms/Image'
import SvgDynamic from '@Atoms/Svg'
import ColumnProject from '@Components/Column'
import FormColumn from '@Components/FormColumn'
import { css } from '@emotion/react'
import type { Column, Init } from '@Redux/reducers/dashboard/reducer'
import { ButtonForm, Wrapper } from '@Styles/global'
import { ContactItem } from '@Styles/pages/listcontacts'
import { Reducers } from '@Types/types'
import idAssignment from '@Utils/id'
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
                    <ContactItem
                      key={item?.id}
                      customstyle={css`
                        cursor: normal;
                        width: 355px;
                        padding: 10px;
                        margin: 10px 0;
                        h4 {
                          margin: 10px 0;
                        }
                      `}
                    >
                      <AtomImage
                        src={item?.image || 'https://via.placeholder.com/150'}
                        width={90}
                        height={90}
                        alt={item?.name}
                      />
                      <Wrapper
                        customstyle={css`
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          margin-left: 20px;
                        `}
                      >
                        <h4>{item?.name?.slice(0, 25)}</h4>
                        <p>{item?.address?.slice(0, 30)}</p>
                      </Wrapper>
                    </ContactItem>
                  </Wrapper>
                </Link>
                <ButtonForm
                  onClick={() => {
                    dispatch({
                      type: 'DELETE_CLIENT_PROJECT',
                      payload: {
                        id,
                        client_id: item.id,
                      },
                    })
                  }}
                  customstyle={css`
                    cursor: pointer;
                    border: none;
                    background: transparent;
                  `}
                >
                  <SvgDynamic href="/icons/cancel" />
                </ButtonForm>
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
              <ButtonForm
                onClick={() => setShow(!show)}
                customstyle={css`
                  cursor: pointer;
                  border: none;
                  background: transparent;
                `}
              >
                <SvgDynamic href="/icons/cancel" />
              </ButtonForm>
            </div>
          </Wrapper>

          {dashboard_clients
            .filter(
              (client) => !dashboard_projects?.clients?.includes(client.id)
            )
            .map((item) => (
              <ButtonForm
                key={item.id}
                customstyle={css`
                  border: none;
                  background: none;
                  margin: 10px 0;
                  padding: 0;
                `}
                onClick={() => {
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
                <ContactItem
                  key={item?.id}
                  customstyle={css`
                    margin: 0;
                    cursor: normal;
                    width: auto;
                    padding: 10px;
                    h3 {
                      margin: 10px 0;
                    }
                  `}
                >
                  <AtomImage
                    src={item?.image || 'https://via.placeholder.com/150'}
                    width={90}
                    height={90}
                    alt={item?.name}
                  />
                  <Wrapper
                    customstyle={css`
                      display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                      margin-left: 20px;
                      h4 {
                        margin: 10px 0;
                      }
                    `}
                  >
                    <h4>{item?.name?.slice(0, 25)}</h4>
                    <p>{item?.address?.slice(0, 30)}</p>
                  </Wrapper>
                </ContactItem>
              </ButtonForm>
            ))}
        </Wrapper>
      ) : (
        <ButtonForm
          customstyle={css`
            border: none;
            width: 400px;
            height: 35px;
            background: #1e90ff;
            color: white;
            font-weight: 600;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
            cursor: pointer;
            padding: 20px 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
          onClick={() => setShow(!show)}
        >
          Add Client
        </ButtonForm>
      )}
      <ButtonForm
        customstyle={css`
          color: #fff;
          padding: 10px;
          font-weight: bold;
          border-radius: 10px;
          font-size: 1rem;
          background: #dd2d2d;
          border: none;
          width: 130px;
          margin: 20px 0;
        `}
        onClick={() => {
          dispatch({
            type: 'DELETE_PROJECT',
            payload: id,
          })
          router.push('/dashboard')
        }}
      >
        Delete project
      </ButtonForm>
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

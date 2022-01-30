import SvgDynamic from '@Atoms/Svg'
import Information from '@Components/Contact/Information'
import FormColumnTask from '@Components/FormColumnTask/FormColumnTask'
import { css } from '@emotion/react'
import { Column, Init } from '@Redux/reducers/dashboard/reducer'
import { ColumnStyled } from '@Styles/components/Column'
import { TaskNumber } from '@Styles/components/Task'
import { Wrapper } from '@Styles/global'
import { Reducers } from '@Types/types'
import idAssignment from '@Utils/id'
import Button from '@Whil/components/Button'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface IProps {
  column: Column
  id: string
  index: number
}

const ColumnProject: FC<IProps> = ({ column, id, index }) => {
  const dashboard_projects: Init = useSelector(
    (state: Reducers) =>
      state.dashboard_projects.filter((item: Init) => item.id === id)[0]
  )
  const tasks = dashboard_projects.columns.map(
    (item: Column) => item.column_tasks && item.column_tasks
  )
  const dispatch = useDispatch()

  return (
    <ColumnStyled>
      <Wrapper
        customstyle={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <h3>{column.column_label}</h3>
        <Button
          click={() =>
            dispatch({
              type: 'DELETE_COLUMN',
              payload: {
                id: id,
                column_id: column.column_id,
              },
            })
          }
          props={{ type: 'default' }}
        >
          <SvgDynamic href="/icons/cancel" />
        </Button>
      </Wrapper>

      {tasks &&
        tasks[index] &&
        tasks[index]?.map((item) => (
          <Wrapper
            customstyle={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}
            key={item?.column_task_id}
          >
            <Wrapper
              customstyle={css`
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <Information
                {...{
                  item: {
                    title: item?.column_task_title,
                    text: item?.column_task_description,
                  },
                }}
              />

              <TaskNumber>{item?.column_task_value}</TaskNumber>
            </Wrapper>
            <Button
              click={() =>
                dispatch({
                  type: 'DELETE_COLUMN_TASK',
                  payload: {
                    id: id,
                    column_id: column.column_id,
                    task_id: item?.column_task_id,
                  },
                })
              }
              props={{ type: 'default' }}
            >
              <SvgDynamic href="/icons/cancel" />
            </Button>
          </Wrapper>
        ))}
      <FormColumnTask
        initvalues={{
          column_task_title: '',
          column_task_description: '',
          column_task_value: '1',
        }}
        submit={(values, resetForm, setShow) => {
          dispatch({
            type: 'ADD_COLUMN_TASK',
            payload: {
              id: id,
              column_id: column.column_id,
              task: {
                ...values,
                column_task_id: idAssignment(45),
              },
            },
          })
          resetForm()
          setShow(false)
        }}
      />
    </ColumnStyled>
  )
}

export default ColumnProject

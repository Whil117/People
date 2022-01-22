/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonForm, LabelWrapper } from '@Styles/global'
import { AddTodoFormError, AddTodoFormInput } from '@Styles/pages/Login'
import { Form, Formik } from 'formik'
import { Dispatch, FC, SetStateAction, useState } from 'react'

interface IProps {
  initvalues: {
    column_task_title: string
    column_task_description: string
    column_task_value: string
  }
  submit: (
    values: {
      column_task_title: string
      column_task_description: string
      column_task_value: string
    },
    resetForm: () => void,
    setShow: Dispatch<SetStateAction<boolean>>
  ) => void
}

const FormClient = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 200px;
  background: #ececec;
  height: 245px;
  padding: 10px;
  border-radius: 5px;
  justify-content: space-between;
`

const FormColumnTask: FC<IProps> = (props) => {
  const [show, setShow] = useState(false)
  return (
    <>
      {show ? (
        <Formik
          initialValues={props.initvalues}
          validate={(values) => {
            const errors: any = {}
            if (!values.column_task_title) {
              errors.column_task_title = 'Required'
            }
            if (!values.column_task_description) {
              errors.column_task_description = 'Required'
            }
            if (
              !values.column_task_value ||
              Number(values.column_task_value) < 0 ||
              Number(values.column_task_value) > 100
            ) {
              errors.column_task_value = 'Required'
            }
            return errors
          }}
          onSubmit={(values, { resetForm }) => {
            props.submit(values, resetForm, setShow)
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <FormClient>
              <LabelWrapper htmlFor="column_task_title">
                Title
                <AddTodoFormInput
                  customstyle={css`
                    width: 81%;
                    resize: none;
                    line-height: 1.5;
                  `}
                  name="column_task_title"
                  id="column_task_title"
                  placeholder="Enter a title"
                />
              </LabelWrapper>
              {errors.column_task_title && touched.column_task_title && (
                <AddTodoFormError>{errors.column_task_title}</AddTodoFormError>
              )}
              <LabelWrapper htmlFor="column_task_description">
                Description
                <AddTodoFormInput
                  customstyle={css`
                    width: 81%;
                    resize: none;
                    line-height: 1.5;
                  `}
                  name="column_task_description"
                  id="column_task_description"
                  placeholder="Enter a description"
                />
              </LabelWrapper>
              {errors.column_task_description &&
                touched.column_task_description && (
                  <AddTodoFormError>
                    {errors.column_task_description}
                  </AddTodoFormError>
                )}
              <LabelWrapper htmlFor="column_task_value">
                Value
                <AddTodoFormInput
                  customstyle={css`
                    width: 81%;
                    resize: none;
                    line-height: 1.5;
                  `}
                  name="column_task_value"
                  id="column_task_value"
                  placeholder="Enter a value"
                />
              </LabelWrapper>
              {errors.column_task_value && touched.column_task_value && (
                <AddTodoFormError>{errors.column_task_value}</AddTodoFormError>
              )}
              <ButtonForm
                customstyle={css`
                  border: none;
                  width: 100%;
                  height: 35px;
                  background: #1e90ff;
                  color: white;
                  font-weight: 600;
                  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                  border-radius: 5px;
                  width: 100%;
                `}
              >
                Add Column task
              </ButtonForm>
            </FormClient>
          )}
        </Formik>
      ) : (
        <ButtonForm
          customstyle={css`
            border: none;
            width: 200px;
            height: 35px;
            background: #1e90ff;
            color: white;
            font-weight: 600;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
          `}
          onClick={() => setShow(!show)}
        >
          Add Column task
        </ButtonForm>
      )}
    </>
  )
}

export default FormColumnTask

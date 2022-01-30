/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonForm, LabelWrapper } from '@Styles/global'
import { AddTodoFormError, AddTodoFormInput } from '@Styles/pages/Login'
import Button from '@Whil/components/Button'
import { Form, Formik } from 'formik'
import { Dispatch, FC, SetStateAction, useState } from 'react'

interface IProps {
  initvalues: {
    column_label: string
    column_color: string
  }
  submit: (
    values: { column_label: string; column_color: string },
    resetForm: () => void,
    setShow: Dispatch<SetStateAction<boolean>>
  ) => void
}

const FormClient = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 200px;
  justify-content: space-between;
`

const FormColumn: FC<IProps> = (props) => {
  const [show, setShow] = useState(false)
  return (
    <>
      {show ? (
        <Formik
          initialValues={props.initvalues}
          validate={(values) => {
            const errors: any = {}
            if (!values.column_label) {
              errors.column_label = 'Required'
            }
            if (!values.column_color) {
              errors.column_color = 'Required'
            }
            return errors
          }}
          onSubmit={(values, { resetForm }) => {
            props.submit(values, resetForm, setShow)
          }}
        >
          {({ values, errors, handleChange, handleBlur, touched }) => (
            <FormClient>
              <LabelWrapper htmlFor="column_label">
                Title
                <AddTodoFormInput
                  customstyle={css`
                    width: 81%;
                    resize: none;
                    line-height: 1.5;
                  `}
                  name="column_label"
                  id="column_label"
                  placeholder="Enter a title"
                />
              </LabelWrapper>
              {errors.column_label && touched.column_label && (
                <AddTodoFormError>{errors.column_label}</AddTodoFormError>
              )}
              <LabelWrapper htmlFor="column_color">
                Color
                <input
                  type="color"
                  name="column_color"
                  id="column_color"
                  value={values.column_color}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  onBlur={handleBlur}
                />
              </LabelWrapper>
              {errors.column_color && touched.column_color && (
                <AddTodoFormError>{errors.column_color}</AddTodoFormError>
              )}
              <Button props={{ type: 'submit' }}>Add Column</Button>
            </FormClient>
          )}
        </Formik>
      ) : (
        <Button props={{ type: 'submit' }} click={() => setShow(!show)}>
          Add Column
        </Button>
      )}
    </>
  )
}

export default FormColumn

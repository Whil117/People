/* eslint-disable no-unused-vars */
import { Button } from '@Whil/styles/components/Button'
import colors from '@Whil/styles/global/colors'
import Styles from '@Whil/types/styles'
import { Form, Formik, FormikState } from 'formik'
import { FC } from 'react'
import Input from '../Input'
import P from '../P'

type arrProps = {
  name: string
  as: string
  id: string
  placeholder: string
  style: {}
}
interface IProps {
  buttonMessage?: string
  arr: arrProps[]
  submit: (
    values: { [x: string]: string },
    resetForm: (
      nextState?:
        | Partial<
            FormikState<{
              [x: string]: string
            }>
          >
        | undefined
    ) => void
  ) => void
}

const Formk: FC<IProps> = ({ arr, submit, buttonMessage }) => {
  return (
    <Formik
      initialValues={arr
        .map((item) => ({
          [item.name]: '',
        }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {})}
      validate={(values) => {
        const errors: { [key: string]: string } = {}
        arr.forEach((item) => {
          if (!values[item.name]) {
            errors[item.name] = `${item.name} is required`
          }
        })
        return errors
      }}
      onSubmit={(values, { resetForm }) => {
        submit(values, resetForm)
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {arr.map((input) => (
            <label htmlFor={input.id} key={input.id}>
              {input.name}
              <Input
                key={input.id}
                name={input.name}
                as={input.as}
                id={input.id}
                placeholder={input.placeholder}
                styles={input.style}
              />
              {errors[input.name] && touched[input.name] && (
                <P styles={{ color: colors.danger, fontWeight: '600' }}>
                  {errors[input.name]}
                </P>
              )}
            </label>
          ))}
          <Button props={{ type: 'submit', style: { margin: '10px 0' } }}>
            {buttonMessage || 'Confirm'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default Formk

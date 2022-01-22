import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import { Field } from 'formik'

export const LoginPageText = styled.p`
  ${({ customstyle }: { customstyle?: SerializedStyles }) => customstyle}
`

export const AddTodoFormInput = styled(Field)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 19px;
  height: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: none;
  outline: none;
  width: ${({ width }: { width?: string }) => width || '88%'};
  ${({ customstyle }: { customstyle?: SerializedStyles }) =>
    customstyle && customstyle}
`
export const AddTodoFormInputImage = styled('input')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 19px;
  height: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: none;
  outline: none;
  width: ${({ width }: { width?: string }) => width || 'auto'};
`
export const AddTodoFormTextarea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 19px;
  height: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: none;
  line-height: 33px;
  outline: none;
  resize: none;
  width: 410px;
  height: 230px;
`
export const AddTodoFormLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 224px;
  height: 224px;
`
export const AddTodoFormSubmit = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 22px 0;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  /* width: 450px; */
  height: 30px;
  background: #66e32b;
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
`
export const AddTodoFormImagePreview = styled.div`
  background: ${({ image }: { image: string | ArrayBuffer | null }) =>
    image ? `url("${image}")` : '#ffffff'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  width: 224px;
  height: 224px;
  border-radius: 5px;
`
export const AddTodoFormWrapper = styled.div`
  display: flex;
  ${({ customstyle }: { customstyle?: SerializedStyles }) =>
    customstyle && customstyle}
`
export const AddTodoFormError = styled.p`
  color: red;
  font-size: 14px;
  font-weight: 600;
`
export const AddTodoFormLabelText = styled.label`
  display: flex;
  font-weight: 600;
  ${({ customstyle }: { customstyle?: SerializedStyles }) => customstyle}
`

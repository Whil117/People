import styled from '@emotion/styled'
import { Field } from 'formik'

export const ChatInputStyle = styled(Field)`
  height: 47px;
  border: none;
  width: 94%;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 16px;
  color: #fff;
  background-color: #2c3e50;
  outline: none;
  margin-right: 10px;
  &:focus {
    background-color: #2c3e50;
  }
`

export const ChatMessage = styled.div`
  height: 40px;
  display: flex;
  margin: 20px 0;
  padding: 20px;
  border: none;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
`

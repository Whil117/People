import { baseUrl } from '@Assets/backend'
import AtomImage from '@Atoms/Image'
import styled from '@emotion/styled'
import { ButtonForm, LabelWrapper, Wrapper } from '@Styles/global'
import { AddTodoFormError, AddTodoFormInput } from '@Styles/pages/Login'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { NextPageContext } from 'next'
import { ChangeEvent, FC, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { css } from '@emotion/react'
import Cookies from 'js-cookie'

interface IProps {
  data: {
    id: string
    name: string
    address: string
    phone_number: string
    author: string
    image: string
  }
}

const FormClient = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 600px;
`

const ViewContact: FC<IProps> = ({ data }) => {
  const [init, setInit] = useState(data)
  const [contact, setContact] = useState(data)

  const extractFile = (event: any) => {
    const file = event.target.files && event.target.files[0]
    return file
  }
  const handleUploadImage = async (img: File) => {
    const storage = getStorage()
    const storageRef = ref(storage, `clients/${img?.name}_${Date.now()}`)
    await uploadBytes(storageRef, img)
    const url = await getDownloadURL(storageRef)
    if (url) {
      setContact({
        ...contact,
        image: url,
      })
    }
  }

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const image = extractFile(event)
    const reader = new FileReader()
    if (image) {
      reader.onloadend = (event) => {
        if (event.target) {
          handleUploadImage(image)
        }
      }
      reader.readAsDataURL(image as Blob)
    }
  }

  const handleSubmit = async (values: IProps['data']) => {
    try {
      await axios
        .put(
          `${baseUrl}/dashboard/viewclient/client`,
          {
            ...values,
            image: contact.image,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              token: Cookies.get('token') || '',
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setInit({
              ...values,
              image: contact.image,
            })
          }
        })
    } catch (error) {}
  }

  return (
    <div>
      <h1>View Contact & Update Contact</h1>
      <div>
        <Formik
          initialValues={contact}
          validate={(validate) => {
            const errors: any = {}
            if (!validate.name) {
              errors.name = 'Name is required'
            }
            if (!validate.address) {
              errors.address = 'Address is required'
            }

            if (!validate.phone_number) {
              errors.phone_number = 'Phone Number is required'
            }
            return errors
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, handleBlur, values }) => (
            <FormClient>
              <Wrapper>
                <LabelWrapper
                  customstyle={css`
                    margin-bottom: 10px;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                  `}
                  htmlFor="image"
                >
                  <AtomImage
                    src={contact.image || '/icons/addimage.svg'}
                    alt={values.name}
                    width={300}
                    height={300}
                  />
                </LabelWrapper>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(event) => {
                    setFieldValue('image', extractFile(event))
                    handleImage(event)
                  }}
                  style={{ display: 'none' }}
                  onBlur={handleBlur}
                />
                {errors.image && touched.image && errors.image && (
                  <AddTodoFormError>{errors.image}</AddTodoFormError>
                )}
              </Wrapper>
              <LabelWrapper>
                Name
                <AddTodoFormInput name="name" />
              </LabelWrapper>
              {errors.name && touched.name && errors.name && (
                <AddTodoFormError>{errors.name}</AddTodoFormError>
              )}
              <LabelWrapper>
                Address
                <AddTodoFormInput name="address" />
              </LabelWrapper>
              {errors.address && touched.address && errors.address && (
                <AddTodoFormError>{errors.address}</AddTodoFormError>
              )}
              <LabelWrapper>
                Phone number
                <AddTodoFormInput name="phone_number" />
              </LabelWrapper>
              {errors.phone_number && touched.phone_number && (
                <AddTodoFormError>{errors.phone_number}</AddTodoFormError>
              )}
              {JSON.stringify(values) !== JSON.stringify(init) && (
                <ButtonForm
                  customstyle={css`
                    border: none;
                    width: 274px;
                    height: 35px;
                    background: #1e90ff;
                    color: white;
                    font-weight: 600;
                    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
                    border-radius: 5px;
                    width: 100%;
                  `}
                  type="submit"
                >
                  Submit
                </ButtonForm>
              )}
            </FormClient>
          )}
        </Formik>
      </div>
    </div>
  )
}
export async function getServerSideProps(context: NextPageContext) {
  const token = context?.req?.headers.cookie
  const { id } = context.query
  const data = await axios
    .post(
      `${baseUrl}/dashboard/viewclient/client`,
      {
        id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          token: token?.slice(6) || '',
        },
      }
    )
    .then((res) => {
      return res.data
    })
  return {
    props: {
      data,
    },
  }
}

export default ViewContact

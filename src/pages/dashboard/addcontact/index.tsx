import { baseUrl } from '@Assets/backend'
import AtomImage from '@Atoms/Image'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonForm, LabelWrapper, Wrapper } from '@Styles/global'
import { AddTodoFormError, AddTodoFormInput } from '@Styles/pages/Login'
import { Reducers } from '@Types/types'
import axios from 'axios'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { Form, Formik } from 'formik'
import Cookies from 'js-cookie'
import { ChangeEvent, FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface IProps {}

const FormClient = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 800px;
  justify-content: space-between;
`

const AddContact: FC<IProps> = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>('')
  const user = useSelector((state: Reducers) => state.user)
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000))

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
      toast.promise(resolveAfter3Sec, {
        pending: 'Pending...',
        success: 'Successful 👌',
        error: 'Error 🤯',
      })
      setImage(url)
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

  const handleSubmit = async (
    values: {
      name: string
      phone_number: string
      email: string
      address: string
      image: string
    },
    resetForm: any
  ) => {
    try {
      await axios
        .post(
          `${baseUrl}/dashboard/addclient`,
          {
            ...values,
            image: image as string,
            author: user.user._id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              token: Cookies.get('token') || '',
            },
          }
        )
        .then((res) => {
          if (res.data) {
            resetForm()
            setImage('')
            toast.promise(resolveAfter3Sec, {
              pending: 'Pending...',
              success: 'Successful 👌',
              error: 'Error 🤯',
            })
          }
        })
    } catch (error) {}
  }
  return (
    <div>
      <h1>Add Client</h1>
      <div>
        <Formik
          initialValues={{
            name: '',
            phone_number: '',
            email: '',
            address: '',
            image: '',
          }}
          validate={(values) => {
            let errors: { [key: string]: string } = {}
            if (!values.name) {
              errors.name = 'name is required'
            }
            if (!values.phone_number) {
              errors.phone_number = 'phone_number is required'
            }
            if (!values.email) {
              errors.email = 'email is required'
            }
            if (!values.address) {
              errors.address = 'address is required'
            }
            if (!values.image) {
              errors.image = 'image is required'
            }
            return errors
          }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, resetForm)
          }}
        >
          {({ errors, touched, values, setFieldValue, handleBlur }) => (
            <FormClient>
              <Wrapper
                customstyle={css`
                  display: flex;
                  flex-direction: column;
                `}
              >
                <LabelWrapper
                  customstyle={css`
                    margin-bottom: 10px;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                  `}
                  htmlFor="image"
                >
                  Avatar
                  <AtomImage
                    src={image || '/icons/addimage.svg'}
                    width={300}
                    height={300}
                    alt={values.name}
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
                {errors.image && touched.image && (
                  <AddTodoFormError>{errors.image}</AddTodoFormError>
                )}
              </Wrapper>
              <LabelWrapper htmlFor="name">
                Name
                <AddTodoFormInput
                  name="name"
                  id="name"
                  type="text"
                  placeholder="name contact"
                />
                {errors.name && touched.name && (
                  <AddTodoFormError>{errors.name}</AddTodoFormError>
                )}
              </LabelWrapper>
              <LabelWrapper htmlFor="phone_number">
                Phone Number
                <AddTodoFormInput
                  name="phone_number"
                  id="phone_number"
                  type="text"
                  placeholder="phone number"
                />
                {errors.phone_number && touched.phone_number && (
                  <AddTodoFormError>{errors.phone_number}</AddTodoFormError>
                )}
              </LabelWrapper>
              <LabelWrapper htmlFor="email">
                Email
                <AddTodoFormInput
                  name="email"
                  id="email"
                  type="text"
                  placeholder="email"
                />
                {errors.email && touched.email && (
                  <AddTodoFormError>{errors.email}</AddTodoFormError>
                )}
              </LabelWrapper>
              <LabelWrapper htmlFor="address">
                Address
                <AddTodoFormInput
                  name="address"
                  type="text"
                  placeholder="address"
                />
                {errors.address && touched.address && (
                  <AddTodoFormError>{errors.address}</AddTodoFormError>
                )}
              </LabelWrapper>
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
            </FormClient>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddContact

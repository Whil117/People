/* eslint-disable no-unused-vars */
import { baseUrl } from '@Assets/backend'
import { Reducers } from '@Types/types'
import Formk from '@Whil/components/Form'
import axios from 'axios'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { FormikState } from 'formik'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface IProps {}

const AddContact: FC<IProps> = () => {
  const user = useSelector((state: Reducers) => state.user)
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000))

  const handleUploadImage = async (img: File) => {
    const storage = getStorage()
    const storageRef = ref(storage, `clients/${img.name}_${Date.now()}`)
    await uploadBytes(storageRef, img)
    const url = await getDownloadURL(storageRef)
    if (url) {
      toast.info('Image uploaded 👌')
      return url
    }
    return ''
  }

  const handleSubmit = async (
    values: {
      [x: string]: string | File
    },
    resetForm: (
      nextState?:
        | Partial<
            FormikState<{
              [x: string]: string
            }>
          >
        | undefined
    ) => void
  ) => {
    try {
      await axios
        .post(
          `${baseUrl}/dashboard/addclient`,
          {
            ...values,
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
            toast.promise(resolveAfter3Sec, {
              pending: 'Pending...',
              success: 'Successful 👌',
              error: 'Error 🤯',
            })
            Router.push('/dashboard/listcontacts')
          }
        })
    } catch (error) {}
  }
  const formData = [
    {
      name: 'name',
      as: 'input',
      id: 'name',
      placeholder: 'Name',
      style: { margin: '10px 0' },
    },
    {
      name: 'phone_number',
      as: 'input',
      id: 'phone_number',
      placeholder: 'Phone Number',
      style: { margin: '10px 0' },
    },
    {
      name: 'email',
      as: 'input',
      id: 'email',
      placeholder: 'Email',
      style: { margin: '10px 0' },
    },
    {
      name: 'address',
      as: 'input',
      id: 'address',
      placeholder: 'Address',
      style: { margin: '10px 0' },
    },
  ]
  const arrImages = [
    {
      name: 'image',
      as: 'input',
      id: 'image',
      placeholder: 'Image',
      style: { margin: '10px 0' },
    },
  ]
  return (
    <div>
      <h1>Add Client</h1>
      <div>
        <Formk
          arr={formData}
          arrImages={arrImages}
          submit={(values, resetForm) => {
            handleUploadImage(values.image as File).then((url) => {
              return handleSubmit(
                {
                  ...values,
                  image: url,
                },
                resetForm
              )
            })
          }}
        />
      </div>
    </div>
  )
}

export default AddContact

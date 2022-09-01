import React, { useContext } from 'react'
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import authContext from '../../context/authContext'
import { JoinButton, JoinRoomContainer } from '../../components/joinRoom'
import "./register.css"

function Register() {
  const { setUsername, setLogged, setHasAccount } = useContext(authContext)
  const initialValues = {
    username: "",
    password: "",
    password2: "",
    email: ""
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    password2: Yup.string().required('You must confirm the password').oneOf([Yup.ref('password'), null], "Passwords do not match"),
    email: Yup.string().email().required()
  })
  const onSubmit = (data: { username: string, email: string, password: string, password2: string }) => {
    axios.post('http://localhost:9000/register', data).then((res) => {
      localStorage.setItem("accessToken", res.data.token)
      localStorage.setItem("username", res.data.user.username)
      setLogged(true)
      setUsername(res.data.user.username)
      setHasAccount(true)
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.err.errors[0].message
      })
      console.log(err)

    })
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

      <Form className="formContainer">
        <JoinRoomContainer>
          <label>Username: </label>
          <ErrorMessage name='username' component='span' />
          <Field
            autoComplete="off"
            id="fieldAddRecord"
            name="username"
            placeholder="Your username" />
          <label>Password: </label>
          <ErrorMessage name='password' component='span' />
          <Field
            autoComplete="off"
            type="password"
            id="fieldAddRecord"
            name="password"
            placeholder="Your password" />
          <label>Confirm password: </label>
          <ErrorMessage name='password2' component='span' />
          <Field
            autoComplete="off"
            type="password"
            id="fieldAddRecord"
            name="password2"
            placeholder="Your password" />
          <label>Email: </label>
          <ErrorMessage name='email' component='span' />
          <Field
            autoComplete="off"
            id="fieldAddRecord"
            name="email"
            placeholder="Your email" />
          <JoinButton type='submit'>Register</JoinButton>
        </JoinRoomContainer>
      </Form>
    </Formik>

  )
}

export default Register
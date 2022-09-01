import axios from 'axios'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { JoinButton, JoinRoomContainer, RoomIdInput } from '../../components/joinRoom'
import authContext from '../../context/authContext'

export const RegisterButton = styled.button`
  outline: none;
  background-color: transparent;
  color: #006;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    text-decoration: underline;
    color: #fff;
  }
`;

function Login() {

  const [username, setCurrentUsername] = useState("")
  const [password, setPassword] = useState("")
  const { setLogged, setUsername, setHasAccount } = useContext(authContext)



  return (
    <JoinRoomContainer>
      <label>Username:</label>
      <RoomIdInput
        type="text"
        onChange={(event) => { setCurrentUsername(event.target.value) }}
        placeholder="Enter your Username"
      />
      <label>Password:</label>
      <RoomIdInput
        type="password"
        onChange={(event) => { setPassword(event.target.value) }}
        placeholder="Enter your Password"
      />
      <JoinButton onClick={async () => {
        await axios.post('http://localhost:9000/login', {
          'username': username,
          'password': password
        }).then(res => {
          console.log(res)
          localStorage.setItem("accessToken", res.data.token)
          localStorage.setItem("username", res.data.user.username)
          setLogged(true)
          setUsername(res.data.user.username)
        }).catch((err) => {
          if (err.response.data.error === "Incorrect password") {
            Swal.fire({
              icon: 'error',
              title: 'Incorrect password!'
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: "Username doesn't exist!"
            })
          }
        })

      }}>Login</JoinButton>
      <RegisterButton onClick={()=> setHasAccount(false)}>No tengo cuenta</RegisterButton>

    </JoinRoomContainer>
  )
}

export default Login
import axios from 'axios'
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import authContext from '../../context/authContext'


function Login() {

  const [username, setCurrentUsername] = useState("")
  const [password, setPassword] = useState("")
  const { setLogged, setUsername, setHasAccount } = useContext(authContext)



  return (
    <div className='loginContainer'>
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => { setCurrentUsername(event.target.value) }}
        placeholder="Enter your Username"
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => { setPassword(event.target.value) }}
        placeholder="Enter your Password"
      />
      <button onClick={async () => {
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

      }}>Login</button>
      <button onClick={()=> setHasAccount(false)}>No tengo cuenta</button>

    </div>
  )
}

export default Login
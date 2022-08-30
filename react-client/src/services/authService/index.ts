import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";
import authContext from "../../context/authContext";



export const login = async (username: string, password: string): Promise<any> => {
    await axios.post('http://localhost:9000/login', {
        'username': username,
        'password': password
    })/*.then((res) => {
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
    })*/
}
import axios from "axios"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"


import { WarningProps } from "../Login"

import './index.css'


export function Register() {

  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const [warning, setWarning] = useState<WarningProps>({ msg: "" })

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      await axios.post('http://localhost:3333/create', {
        "name": data.name,
        "email": data.email,
        "password": data.password,
        "unique": data.unique,
      }).then(res => {
        setWarning(res.data)

        setTimeout(() => {
          alert("Congrats, you created yout account!")
          navigate("/")
        }, 600)
      }).catch(error => {
        setWarning(error.response.data)
        // console.log(error.response.data);
      })

      // console.log(warning.msg);
      if (warning.msg === "") {

      }

    } catch (error) {
      alert("Deu erro")
    }
  }

  function toggleIsVisible() {
    setIsVisible(!isVisible)
  }

  return (
    <main>
      <div className="register">
        <div className="container">
          <div className="header">
            <h1>Register</h1>
          </div>

          <form onSubmit={handleCreateUser}>
            <div className="input-form">
              <span>E-mail</span>
              <input type="email" required placeholder="johndoe@gmail.com" id="email" name="email" minLength={10} />
            </div>

            <div className="input-form">
              <span>Name</span>
              <input type="text" required placeholder="John Doe" id="name" name="name" min={4} />
            </div>

            <div className="input-form">
              <span>User</span>
              <input type="text" required placeholder="JohnDoe" id="unique" name="unique" min={4} />
            </div>
            {
              isVisible ? (
                <div className="input-form">
                  <span>Password</span>
                  <input type="text" required placeholder="***************" id="password" name="password" minLength={6} />
                  <FaEye className="icon" onClick={toggleIsVisible} size={20} color="#86878A" />
                </div>
              ) :
                (
                  <div className="input-form">
                    <span>Password</span>
                    <input type="password" required placeholder="***************" id="password" name="password" minLength={6} />
                    <FaEyeSlash className="icon" onClick={toggleIsVisible} size={20} color="#86878A" />
                  </div>
                )
            }

            <button type="submit" className="btn">Sign Up</button>

            <div className="warning">{warning.msg}</div>
          </form>
        </div>
      </div>
    </main>
  )
}
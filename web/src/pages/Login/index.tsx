import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"

import api from "../../lib/api"

import './index.css'

export interface WarningProps {
  msg: string
}

export function Login() {

  const [isVisible, setIsVisible] = useState(false)
  const [warning, setWarning] = useState<WarningProps>({ msg: "" })
  const navigate = useNavigate()

  async function handleAuthLogin(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      await api.post('/auth/user', {
        "email": data.email,
        "password": data.password
      }).then(res => {
        setWarning(res.data)        
        navigate(`home/${res.data.unique}/info`)
      }).catch(error => {
        setWarning(error.response.data)
      })
    } catch (error) {
      console.log(error);     
    }
  }

  function toggleIsVisible() {
    setIsVisible(!isVisible)
  }

  return (
    <main>
      <div className="login">
        <section className="leftside">
          <div className="welcome">
            <span>Welcome</span>
            <span>Back!</span>
          </div>
        </section>
        <section className="rightside">

          <div className="container">
            <div className="header">
              <h1>Login</h1>
              <span>Welcome Back! Please login to you account.</span>
            </div>

            <form onSubmit={handleAuthLogin}>
              <div className="input-form">
                <span>E-mail</span>
                <input type="text" required placeholder="johndoe@gmail.com" id="email" name="email" min={10} />
              </div>
              {
                isVisible ? (
                  <div className="input-form">
                    <span>Password</span>
                    <input type="text" required placeholder="***************" id="password" name="password" min={6} />
                    <FaEye className="icon" onClick={toggleIsVisible} size={20} color="#86878A" />
                  </div>
                ) :
                  (
                    <div className="input-form">
                      <span>Password</span>
                      <input type="password" required placeholder="***************" id="password" name="password" />
                      <FaEyeSlash className="icon" onClick={toggleIsVisible} size={20} color="#86878A" min={6} />
                    </div>
                  )
              }

              <button type="submit" className="btn">Sign In</button>
              <span className="link">Dont have account? No Problems, <Link to="/create">click here</Link></span>

              <div className="warning">{warning.msg}</div>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
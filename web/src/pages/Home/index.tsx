import { useContext, useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"

import { Header } from "../../components/Header"
import './index.css'
import { AuthContext } from "../../context/Auth/AuthContext"
import { api } from "../../lib/api"


export interface InfoLoginProps{
  id: string,
  name: string,
  email: string,
}


export function Home() {

  const [infoLogin, setInfoLogin] = useState<InfoLoginProps[]>([])
  const auth = useContext(AuthContext)
  
  // useEffect(() => {
  //   api.get('/profile', {
  //     headers: {
  //       Authorization: `Bearer ${auth.user?.accessToken}`
  //     }
  //   })
  //   .then( res => console.log(res.data)
  //   )
  // }, [])

  return (
    <>


      <Header />

      <section className="container">
        <aside>
          <div className="box" >
            <ul>
              <li><Link to="info">Info</Link></li>
            </ul>
          </div>
          <div className="box">
            <ul>
              <li><Link to="coisas">Coisas</Link></li>
            </ul>
          </div>
        </aside>
        <div className="content">
          <Outlet />
        </div>
      </section>
    </>
  )
}
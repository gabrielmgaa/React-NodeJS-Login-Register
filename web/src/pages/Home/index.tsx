import { useEffect, useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import axios from "axios"

import { Header } from "../../components/Header"
import './index.css'
import { Coisas } from "../../components/Coisas"


export interface InfoLoginProps {
  id: string,
  name: string,
  email: string,
}


export function Home() {


  const { unique } = useParams()

  const [infoLogin, setInfoLogin] = useState<InfoLoginProps>()

  useEffect(() => {
    axios.get(`http://localhost:3333/user/${unique}`)
      .then(res => {
        setInfoLogin(res.data)
      })
  }, [])

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
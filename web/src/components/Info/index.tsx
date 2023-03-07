import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../context/Auth/AuthContext"

import { replaceCreatedAt } from "../../helpers/replaceCreatedAt"

import './index.css'

export function Info() {

  // const [info, setInfo] = useState<infoUserProps[]>([])
  const auth = useContext(AuthContext)
  
  // useEffect(() => {
  //   axios.get(`http://localhost:3333/user/${unique}`)
  //     .then(res => {
  //       setInfo(res.data)
  //     })
  // }, [])

  return (
    <div key={auth.user?.id} className="infos-user">
      <span>Email: {auth.user?.email}</span>
      <span>Name: {auth.user?.name}</span>
    </div>
  )
}
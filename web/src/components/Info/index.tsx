import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { replaceCreatedAt } from "../../helpers/replaceCreatedAt"

import './index.css'

interface infoUserProps {
  id: string,
  name: string,
  unique: string,
  email: string,
  createdAt: string,
}

export function Info() {

  const { unique } = useParams()
  const [info, setInfo] = useState<infoUserProps[]>([])

  useEffect(() => {
    axios.get(`http://localhost:3333/user/${unique}`)
      .then(res => {
        setInfo(res.data)
      })
  }, [])

  return (
    <>
      {
        info.map(info => {
          return (
            <div key={info.id} className="infos-user">
              <span>Email: {info.email}</span>
              <span>Name: {info.name}</span>
              <span>User: {info.unique}</span>
              <span>Created: {replaceCreatedAt(info.createdAt)}</span>
            </div>
          )
        })
      }
    </>
  )
}
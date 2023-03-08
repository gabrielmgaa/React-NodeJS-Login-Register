import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../context/Auth/AuthContext"

import { replaceCreatedAt } from "../../helpers/replaceCreatedAt"

import './index.css'

export function Info() {

  const auth = useContext(AuthContext)

  return (
    <>
      <div className="infos-user">
        <span>Email: {auth.user?.email}</span>
        <span>Name: {auth.user?.name}</span>
      </div>
    </>

  )
}
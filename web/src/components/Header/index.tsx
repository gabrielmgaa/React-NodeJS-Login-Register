import { BiUser } from "react-icons/bi"

import './index.css'

export function Header() {
  return (
    <header>
      <div className="container">
        <div className="menu-section">
          <div className="menu-toggle">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
          </div>
        </div>

        <nav>
          <ul>
            <li><a href="#">Quem Somos?</a></li>
            <li><a href="#">Sobre Nós</a></li>
          </ul>
        </nav>

        <div className="user">
          <BiUser size={25}/>
        </div>
      </div>
    </header >
  )
}
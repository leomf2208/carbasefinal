import { Link } from 'react-router-dom'

import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <h1>🚗 CARBASE </h1>

      <div className="links">
        <Link to="/">Início</Link>

        <Link to="/cadastro">
          Cadastro Veículos
        </Link>

        <Link to="/estoque">
          Consultar Estoque
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
// Adicionar botão Sair manualmente se necessário.
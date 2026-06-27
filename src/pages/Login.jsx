import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  const nav = useNavigate();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      setUsuarioLogado(JSON.parse(usuarioSalvo));
    }
  }, []);

  function entrar(e) {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioEncontrado = usuarios.find((x) => x.email === email);

    if (!usuarioEncontrado) {
      setMsg("Usuário não encontrado. Faça cadastro.");
      return;
    }

    if (usuarioEncontrado.senha !== senha) {
      setMsg("Senha incorreta.");
      return;
    }

    const usuarioParaSalvar = {
      ...usuarioEncontrado,
      nome: usuarioEncontrado.nome || usuarioEncontrado.email?.split("@")[0] || "Usuário",
    };

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioParaSalvar));
    setUsuarioLogado(usuarioParaSalvar);
    setMsg("Login realizado com sucesso!");
    onLogin?.(usuarioParaSalvar);

    setTimeout(() => {
      nav("/");
    }, 300);
  }

  function sair() {
    localStorage.removeItem("usuarioLogado");
    setUsuarioLogado(null);
    setMsg("");
    onLogin?.(null);
    nav("/login");
  }

  return (
    <div className="auth">
      <h2>Login</h2>

      {usuarioLogado ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ margin: 0 }}>
            Olá, {usuarioLogado.nome || usuarioLogado.email?.split("@")[0] || "Usuário"}!
          </p>

          <button
            type="button"
            onClick={sair}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "8px 14px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Sair
          </button>
        </div>
      ) : (
        <form onSubmit={entrar}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <p>{msg}</p>
          <Link to="/cadastro-usuario">Fazer cadastro</Link>
        </form>
      )}
    </div>
  );
}
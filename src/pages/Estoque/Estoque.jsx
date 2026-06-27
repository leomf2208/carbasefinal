import { useNavigate } from "react-router-dom";

import CardVeiculo from "../../components/CardVeiculo/CardVeiculo";

import "./Estoque.css";

function Estoque({
  veiculos,
  setVeiculos,
  setVeiculoEditando,
}) {
  const navigate = useNavigate();

  const handleExcluir = (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este veículo?"
    );

    if (confirmar) {
      const novaLista = veiculos.filter(
        (veiculo) => veiculo.id !== id
      );

      setVeiculos(novaLista);
    }
  };

  const handleEditar = (veiculo) => {
    setVeiculoEditando(veiculo);

    navigate("/cadastro");
  };

  return (
    <div className="estoque">
      <h2>Estoque de Veículos</h2>

      <div className="cards">
        {veiculos.length === 0 ? (
          <p className="sem-veiculos">
            Nenhum veículo cadastrado.
          </p>
        ) : (
          veiculos.map((veiculo) => (
            <CardVeiculo
              key={veiculo.id}
              veiculo={veiculo}
              onExcluir={handleExcluir}
              onEditar={() =>
                handleEditar(veiculo)
              }
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Estoque;
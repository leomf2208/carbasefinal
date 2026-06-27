import "./CardVeiculo.css";

function CardVeiculo({ veiculo, onExcluir, onEditar }) {
  return (
    <div className="card">
      <img
        src={veiculo.foto}
        alt={veiculo.modelo}
      />

      <h3>{veiculo.modelo}</h3>

      <p>
        <strong>Marca:</strong> {veiculo.marca}
      </p>

      <p>
        <strong>Ano:</strong> {veiculo.ano}
      </p>

      <p>
        <strong>Placa:</strong> {veiculo.placa}
      </p>

      <p>
        <strong>Cor:</strong> {veiculo.cor}
      </p>

      <p>
        <strong>Custo:</strong> R$ {veiculo.custo}
      </p>

      <p>
        <strong>Venda:</strong> R$ {veiculo.preco}
      </p>

      <div className="acoes">
        <button
          className="editar"
          onClick={() => onEditar(veiculo.id)}
        >
          Editar
        </button>

        <button
          className="excluir"
          onClick={() => onExcluir(veiculo.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default CardVeiculo;
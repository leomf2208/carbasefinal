import { useEffect, useState } from "react";

import "./CadastroVeiculo.css";

function CadastroVeiculo({
  veiculos,
  setVeiculos,
  veiculoEditando,
  setVeiculoEditando,
}) {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [placa, setPlaca] = useState("");
  const [cor, setCor] = useState("");
  const [preco, setPreco] = useState("");
  const [custo, setCusto] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    if (veiculoEditando) {
      setMarca(veiculoEditando.marca);
      setModelo(veiculoEditando.modelo);
      setAno(veiculoEditando.ano);
      setPlaca(veiculoEditando.placa);
      setCor(veiculoEditando.cor);
      setPreco(veiculoEditando.preco);
      setCusto(veiculoEditando.custo);
      setFoto(veiculoEditando.foto);
    }
  }, [veiculoEditando]);

  const handleImagem = (e) => {
    const arquivo = e.target.files[0];

    if (arquivo) {
      const urlImagem =
        URL.createObjectURL(arquivo);

      setFoto(urlImagem);
    }
  };

  const limparCampos = () => {
    setMarca("");
    setModelo("");
    setAno("");
    setPlaca("");
    setCor("");
    setPreco("");
    setCusto("");
    setFoto("");
  };

  const handleCadastrar = (e) => {
    e.preventDefault();

    if (veiculoEditando) {
      const listaAtualizada = veiculos.map(
        (veiculo) =>
          veiculo.id === veiculoEditando.id
            ? {
                ...veiculo,
                marca,
                modelo,
                ano,
                placa,
                cor,
                preco,
                custo,
                foto,
              }
            : veiculo
      );

      setVeiculos(listaAtualizada);

      setVeiculoEditando(null);

      alert("Veículo atualizado!");
    } else {
      const novoVeiculo = {
        id: Date.now(),
        marca,
        modelo,
        ano,
        placa,
        cor,
        preco,
        custo,
        foto,
      };

      setVeiculos([...veiculos, novoVeiculo]);

      alert("Veículo cadastrado!");
    }

    limparCampos();
  };

  return (
    <div className="cadastro">
      <h2>
        {veiculoEditando
          ? "Editar Veículo"
          : "Cadastrar Veículo"}
      </h2>

      <form onSubmit={handleCadastrar}>

        <input
          type="text"
          placeholder="Placa"
          value={placa}
          onChange={(e) =>
            setPlaca(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) =>
            setMarca(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) =>
            setModelo(e.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={(e) =>
            setAno(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Cor"
          value={cor}
          onChange={(e) =>
            setCor(e.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) =>
            setPreco(e.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Custo"
          value={custo}
          onChange={(e) =>
            setCusto(e.target.value)
          }
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImagem}
        />

        {foto && (
          <img
            src={foto}
            alt="Preview"
            className="preview-imagem"
          />
        )}

        <button type="submit">
          {veiculoEditando
            ? "Salvar Alterações"
            : "Cadastrar Veículo"}
        </button>
      </form>
    </div>
  );
}

export default CadastroVeiculo;
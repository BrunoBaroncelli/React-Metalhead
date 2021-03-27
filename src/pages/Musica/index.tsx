import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "components";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { apiMusica } from "api/data";
import { IMusica } from "interfaces/Musica.interface";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { Button } from "styles";
import * as S from "./styles";

const Musica = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [musicas, setMusicas] = useState<IMusica[]>([]);
  const history = useHistory();

  const fetchData = async () => {
    const response = await apiMusica.index();
    setMusicas(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    confirmAlert({
      title: "Atenção",
      message: "Tem certeza que deseja apagar o item selecionado?",
      buttons: [
        {
          label: "SIM",
          onClick: async () => {
            await apiMusica.delete(id);
            toast.success("Musica removida!");
            fetchData();
          },
        },
        {
          label: "NÃO",
          onClick: () => console.log("não"),
        },
      ],
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Button bgColor="success" onClick={() => history.push("/musica/0")}>
            <FaPlusCircle /> &nbsp; Adicionar
          </Button>
          <S.Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Banda</th>
                <th>Genero</th>
                <th>Album</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {musicas &&
                musicas.map((item) => (
                  <tr key={item.id}>
                    <td>{item.musica_nome}</td>
                    <td>{item.banda?.nome}</td>
                    <td>{item.genero}</td>
                    <td>{item.album}</td>
                    <td>
                      <Button
                        bgColor="primary"
                        onClick={() => history.push(`musica/${item.id}`)}
                      >
                        <FaPencilAlt />
                      </Button>
                    </td>
                    <td>
                      <Button
                        bgColor="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaPencilAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </S.Table>
        </>
      )}
    </>
  );
};
export default Musica;
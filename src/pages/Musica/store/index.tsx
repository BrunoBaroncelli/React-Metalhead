import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiMusica, apiBanda } from "api/data";
import { Loading } from "components";
import { Input, Button, Form, Link, Select, Textarea } from "styles";
import { IMusica } from "interfaces/Musica.interface";
import { IBanda } from "interfaces/Banda.interface";

const MusicaStore = () => {
  const [musica, setMusica] = useState<IMusica>({} as IMusica);
  const [banda, setBanda] = useState<IBanda[]>({} as IBanda[]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBanda = async () => {
      try {
        const response = await apiBanda.index();
        setBanda(response.data);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanda();
    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiMusica.show(id);
          setMusica(response.data);
        } catch (error) {
          toast.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData(Number(id));
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleChange = useCallback(
    async (e) => {
      setMusica({ ...musica, [e.target.name]: e.target.value });
    },
    [musica]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.id > 0) {
          await apiMusica.update(data.id, data);
          toast.success("Musica Alterada com sucesso!");
        } else {
          await apiMusica.store(data);
          toast.success("Musica Cadastrada com sucesso!");
        }
        history.push("/musica");
      } catch (error) {
        toast.error(() =>
          error.response.data ? error.response.data.join("\n") : error.message
        );
      }
    },
    [history]
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Link onClick={() => history.push("/musica")} bgColor="warning">
            <FaHandPointLeft /> &nbsp; Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={id || ""} ref={register} />
            <div>
              <label htmlFor="banda">Banda: </label>
              <Select
                name="banda_id"
                id="banda"
                value={musica.banda_id || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              >
                <option></option>
                {banda.length > 0 &&
                  banda.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome}
                    </option>
                  ))}
              </Select>
            </div>
            <div>
              <label htmlFor="musica_nome">Nome: </label>
              <Input
                type="text"
                name="musica_nome"
                id="musica_nome"
                value={musica.musica_nome || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome_musica}
              />
            </div>
            <div>
              <label htmlFor="genero">Gênero: </label>
              <Textarea
                name="genero"
                id="genero"
                value={musica.genero || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.genero}
              />
            </div>
            <div>
              <label htmlFor="album">Album: </label>
              <Input
                name="album"
                id="album"
                value={musica.album || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.album}
              />
            </div>
            <Button bgColor="success" type="submit">
              <FaSave /> &nbsp; Salvar
            </Button>
          </Form>
        </>
      )}
    </>
  );
};
export default MusicaStore;
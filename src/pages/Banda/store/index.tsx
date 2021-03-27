import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiBanda } from "api/data";
import { Loading } from "components";
import { Input, Button, Form, Link } from "styles";
import { IBanda } from "interfaces/Banda.interface";

const BandaStore = () => {
  const [banda, setBanda] = useState<IBanda>({} as IBanda);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiBanda.show(id);
          setBanda(response.data);
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
      setBanda({ ...banda, [e.target.name]: e.target.value });
    },
    [banda]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.id > 0) {
          await apiBanda.update(data.id, data);
          toast.success("Banda Alterada com sucesso!");
        } else {
          await apiBanda.store(data);
          toast.success("Banda Cadastrada com sucesso!");
        }
        history.push("/banda");
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
          <Link onClick={() => history.push("/banda")} bgColor="warning">
            <FaHandPointLeft /> &nbsp; Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={id || ""} ref={register} />
            <div>
              <label htmlFor="nome">Nome: </label>
              <Input type="text" name="nome" id="nome" value={banda.nome || ""} onChange={handleChange}
                ref={register({ required: true })} required error={errors.nome}/>
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
export default BandaStore;
import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsPerson } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { apiUser } from "api/data";
import { Loading } from "components";
import { Input, Button } from "styles";
import * as S from "./styles";

const Cadastro = () => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleLogin = useCallback(
    async (data) => {
      console.log(data);
      try {
        await apiUser.register(data);
        toast.success("Usuário Cadastrado com sucesso!");
        history.push("/login");
      } catch (error) {
        toast.error(`Falha no Login! ${error.response.data}`);
      }
    },
    [history]
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <S.Form onSubmit={handleSubmit(handleLogin)}>
            <S.BoxLogin>
              <S.BoxInput>
                <BsPerson />
                <Input
                  type="text"
                  name="username"
                  placeholder="Nome"
                  ref={register({ required: true })}
                  required
                />
              </S.BoxInput>
              <S.BoxInput>
                <HiOutlineMail />
                <Input type="email" name="email" placeholder="E-mail" ref={register({ required: true })} required/>
              </S.BoxInput>
              <S.BoxInput>
                <RiLockPasswordLine />
                <Input type="password" name="password" placeholder="Senha" ref={register({ required: true, minLength: 3 })} required/>
              </S.BoxInput>
              <S.BoxButton>
                <Button type="submit">Enviar</Button>
                <Button type="button" onClick={() => history.push("/login")}>Login</Button>
              </S.BoxButton>
            </S.BoxLogin>
          </S.Form>
        </div>
      )}
    </>
  );
};

export default Cadastro;
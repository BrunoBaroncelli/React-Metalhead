import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { useAuth } from "hooks/auth";
import { Loading } from "components";
import { Input, Button } from "styles";
import * as S from "./styles";
import { toast } from "react-toastify";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const { signIn } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleLogin = useCallback(
    async (data) => {
      console.log(data);
      try {
        await signIn(data);
        toast.success("Login realizado com sucesso!");
      } catch (error) {
        toast.error(`Falha no Login! ${error.response.data}`);
      }
    },
    [signIn]
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <FaHome size={30} onClick={() => (window.location.href = "https://nextjs-metalhead.vercel.app")}/>
          <S.Form onSubmit={handleSubmit(handleLogin)}>
            <S.BoxLogin>
              <S.BoxInput>
                <HiOutlineMail />
                <Input type="email" name="email" placeholder="E-mail" ref={register({ required: true })}required/>
              </S.BoxInput>
              <S.BoxInput>
                <RiLockPasswordLine />
                <Input type="password" name="password" placeholder="Senha" ref={register({ required: true, minLength: 3 })} required/>
              </S.BoxInput>
              <S.BoxButton>
                <Button type="submit">Enviar</Button>
                <Button type="button" onClick={() => history.push("/cadastro")}>Cadastrar</Button>
              </S.BoxButton>
            </S.BoxLogin>
          </S.Form>
        </div>
      )}
    </>
  );
}
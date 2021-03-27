import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { useAuth } from "hooks/auth";
import { Link } from "styles";
import { Container } from "./styles";

const Header = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const handleSignout = useCallback(() => {
    signOut();
    toast.success("Volte sempre!");
    history.push("/login");
  }, [signOut, history]);

  return (
    <Container>
      <div className="container">
        <FaHome onClick={() => history.push("/")} />
        <Link href={`/banda`}>Bandas</Link>
        <Link href={`/musica`}>Musicas</Link>
        <div>
          <IoIosLogOut onClick={handleSignout} />
        </div>
      </div>
    </Container>
  );
};

export default Header;
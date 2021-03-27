import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import { Main, Login, Cadastro, Banda, BandaStore, Musica, MusicaStore } from "pages";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <PrivateRoute exact path="/banda/:id" component={BandaStore} />
      <PrivateRoute exact path="/banda" component={Banda} />
      <PrivateRoute exact path="/musica/:id" component={MusicaStore} />
      <PrivateRoute exact path="/musica" component={Musica} />
      <PrivateRoute exact path="/" component={Main} />
    </Switch>
  );
};

export default Routes;

      
import api from "api";
import { IMusica } from "interfaces/Musica.interface"

class MusicaData {
  index() {
    return api.get<IMusica[]>('musicas');
  }
  show(id: number) {
    return api.get<IMusica>(`musicas/${id}`);
  }
  store(data: IMusica) {
    return api.post<IMusica>(`musicas`, data);
  }
  update(id: number, data: IMusica) {
    return api.put<IMusica>(`musicas/${id}`, data);
  }
  delete(id: number) {
    return api.delete<IMusica>(`musicas/${id}`);
  }
}

export default new MusicaData();
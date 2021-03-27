import api from "api";
import { IBanda } from "interfaces/Banda.interface"

class BandaData {
  index() {
    return api.get<IBanda[]>('bandas');
  }
  show(id: number) {
    return api.get<IBanda>(`bandas/${id}`);
  }
  store(data: IBanda) {
    return api.post<IBanda>(`bandas`, data);
  }
  update(id: number, data: IBanda) {
    return api.put<IBanda>(`bandas/${id}`, data);
  }
  delete(id: number) {
    return api.delete<IBanda>(`bandas/${id}`);
  }
}

export default new BandaData();
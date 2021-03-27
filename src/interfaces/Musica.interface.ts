export interface IMusica {
    id: number;
    banda_id?: number;
    banda?:{
      id: number;
      nome: string;
    }
    musica_nome: string;
    genero: string;
    album: string;
  }
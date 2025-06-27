import { Superpoder } from "./superpoder";


export interface Hero {
  id?: number;
  nome: string;
  nomeHeroi: string;
  dataNascimento: string;
  altura: number;
  peso: number;
  superpoderes: Superpoder[];
}
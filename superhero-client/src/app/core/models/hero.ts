import { Superpower } from "./super_power";


export interface Hero {
  id: number;
  nome: string;
  nomeHeroi: string;
  dataNascimento: string; 
  altura: number;
  peso: number;
  superpoderes: Superpower[];
}

export interface HeroRequest {
  nome: string;
  nomeHeroi: string;
  dataNascimento: string; 
  altura: number;
  peso: number;
  superpoderesIds: number[];
}
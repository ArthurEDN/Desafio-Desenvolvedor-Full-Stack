export interface HeroCreateRequest {
  nome: string;
  nomeHeroi: string;
  dataNascimento: string;
  altura: number;
  peso: number;
  superpoderIds: number[];
}
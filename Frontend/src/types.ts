export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  transacoes?: Transacao[];
}


export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: "Despesa" | "Receita";
  pessoaId: number;
}

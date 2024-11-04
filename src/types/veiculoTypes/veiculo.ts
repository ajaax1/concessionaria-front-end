type Status = 'USADO' | 'NOVO' | 'SEMINOVO';

type veiculo = {
    id: bigint;
    nome: string;
    marca: string;
    modelo: string;
    ano: number;
    cor: string;
    preco: number;
    descricao: string;
    status: Status;
    quilometragem: number;
}

export default veiculo;
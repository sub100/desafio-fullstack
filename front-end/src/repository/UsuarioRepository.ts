interface UsuarioRepositoryGetParams {
    page: number;
    limit: number;
}

interface UsuarioRepositoryGetResponse {
    usuarios: Usuario[];
    total: number;
}

class UsuarioRepository {
    public async get({ page, limit }: UsuarioRepositoryGetParams): Promise<UsuarioRepositoryGetResponse>  {
        const requisicao = fetch(`http://localhost:8000/api/usuarios?page=${page}&limit=${limit}`)
        const resposta = await requisicao;
        const respostaDoServidor = await resposta.json();

        return { 
            usuarios: respostaDoServidor.data,
            total: respostaDoServidor.total,
        } as UsuarioRepositoryGetResponse;
    }

    public async cadastrar(dadosUsuario: any) {
        const requisicao = fetch(`http://localhost:8000/api/usuarios`, {
            method: 'POST',
            body: JSON.stringify(dadosUsuario),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resposta = await requisicao;
        const respostaDoServidor = await resposta.json();

        return respostaDoServidor;
    }

    public async deletar(idUsuario: number) {
        const requisicao = fetch(`http://localhost:8000/api/usuarios/${idUsuario}`, {
            method: 'DELETE',
        });
        const resposta = await requisicao;
        const respostaDoServidor = await resposta.json();

        return respostaDoServidor;
    }

    public async atualizar(idUsuario: number, dadosUsuario: any) {
        const requisicao = fetch(`http://localhost:8000/api/usuarios/${idUsuario}`, {
            method: 'PUT',
            body: JSON.stringify(dadosUsuario),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resposta = await requisicao;
        const respostaDoServidor = await resposta.json();

        return respostaDoServidor;
    }

    public async buscarPorId(idUsuario: number) {
        const requisicao = fetch(`http://localhost:8000/api/usuarios/${idUsuario}`);
        const resposta = await requisicao;
        const respostaDoServidor = await resposta.json();

        return respostaDoServidor;
    }
}

interface Usuario {
    id: number;
    nome: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export default new UsuarioRepository();
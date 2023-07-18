import UsuarioRepository from "../repository/UsuarioRepository";

interface UsuarioControllerGetParams {
    page?: number;
}

class UsuarioController {
    public async get({ page }: UsuarioControllerGetParams = {}) {
        return UsuarioRepository.get({
            page: page ?? 1,
            limit: 10
        });
    }

    public async cadastrar(dadosUsuario: any) {
        return UsuarioRepository.cadastrar(dadosUsuario);
    }

    public async deletar(idUsuario: number) {
        return UsuarioRepository.deletar(idUsuario);
    }

    public async atualizar(idUsuario: number, dadosUsuario: any) {
        return UsuarioRepository.atualizar(idUsuario, dadosUsuario);
    }

    public async buscarPorId(idUsuario: number) {
        return UsuarioRepository.buscarPorId(idUsuario);
    }
}

export default new UsuarioController();
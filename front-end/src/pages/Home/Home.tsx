import React from "react";
import UsuarioController from "../../controller/UsuarioController";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns';

interface Usuario {
    id: number;
    nome: string;
    email: string;
    created_at: string;
    updated_at: string;
}

const Home = () => {
    const [usuarios, setUsuarios] = React.useState<Usuario[]>([]);
    const [totalUsuarios, setTotalUsuarios] = React.useState<number>(0);
    const [paginaAtual, setPaginaAtual] = React.useState<number>(1);
    const [paginacao, setPaginacao ] = React.useState<number[]>([]);
    
    React.useEffect(() => {
        UsuarioController.get({ page: paginaAtual }).then((response) => {
            setUsuarios(response.usuarios);
            setTotalUsuarios(response.total);
            const quantidadeDePaginas = Math.ceil(response.total/5)
            setPaginacao(new Array(quantidadeDePaginas).fill(true, 0, quantidadeDePaginas));
        })
    }, [paginaAtual])

    function lidarComExcluir(idUsuario) {
        UsuarioController.deletar(idUsuario).then((response) => {
            if ( response.message === "Usuário excluído com sucesso" ) {
                const usuariosAtualizados = usuarios.filter((usuario) => {
                    return usuario.id !== idUsuario;
                });
                setUsuarios(usuariosAtualizados);
            }

            alert(response.message);
            return;
        });
    }

    function lidarComPaginacao(pagina) {
        setPaginaAtual(pagina);
    }

    function lidaComPaginacaoAnterior() {
        if ( paginaAtual === 1 ) return;
        setPaginaAtual(paginaAtual - 1);
    }

    function lidaComPaginacaoProximo() {
        if ( paginaAtual === paginacao.length ) return;
        setPaginaAtual(paginaAtual + 1);
    }

    return (
        <div className="max-w-full mt-5">
            <div className="container px-4 mx-auto sm:px-8 bg-slate-50">
                <div className="py-8">
                    <Link 
                        className="transition-colors py-2 px-4 rounded text-white bg-indigo-600 hover:bg-indigo-500 hover:text-white focus:ring-indigo-300 focus:ring-4" to="/cadastrar-usuario" 
                    >
                        Criar usuário
                    </Link>
                    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8 ">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            <table className="min-w-full leading-normal ">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Nome
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Email
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Data de criação
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Data de atualização
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usuarios.length > 0
                                        ? usuarios.map((usuario) => {
                                            return (
                                                <tr key={usuario.id}>
                                                    <td 
                                                        className="px-5 py-5 text-sm bg-white border-b border-gray-200"
                                                    >
                                                        <div className="flex items-center">
                                                            <div>
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {usuario.nome}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td 
                                                        className="px-1 py-1 text-sm bg-white border-b border-gray-200"
                                                    >
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {usuario.email}
                                                        </p>
                                                    </td>
                                                    <td 
                                                        className="px-5 py-5 text-sm bg-white border-b border-gray-200"
                                                    >
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {
                                                                format(
                                                                    new Date(usuario.created_at), 
                                                                    'dd/MM/yyyy HH:mm:ss'
                                                                )
                                                            }
                                                        </p>
                                                    </td>
                                                    <td 
                                                        className="px-5 py-5 text-sm bg-white border-b border-gray-200"
                                                    >
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {
                                                                format(
                                                                    new Date(usuario.updated_at), 
                                                                    'dd/MM/yyyy HH:mm:ss'
                                                                )
                                                            }
                                                        </p>
                                                    </td>
                                                    <td 
                                                        className="px-5 py-5 text-sm bg-white border-b border-gray-200 flex gap-2"
                                                    >
                                                        <Link to={`/editar-usuario/${usuario.id}`} className="transition-colors py-2 px-4 rounded text-white bg-indigo-500 hover:bg-indigo-400 hover:text-white focus:ring-indigo-300 focus:ring-4">Editar</Link>
                                                        <button 
                                                            className="text-white transition-colors bg-red-400 hover:bg-red-300" 
                                                            onClick={() => lidarComExcluir(usuario.id)}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        : (
                                            <tr>
                                                <td colSpan={12} className="text-center">
                                                    <div className="flex items-center p-2">
                                                        <div className="w-full">
                                                            <p className="text-gray-900 whitespace-no-wrap text-center">
                                                                Nenhum usuário encontrado!
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            {
                                totalUsuarios > 10
                                ? (
                                    <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                                        <div className="flex items-center">
                                            <button
                                                onClick={lidaComPaginacaoAnterior}
                                                type="button" 
                                                className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                                            >
                                                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                                    </path>
                                                </svg>
                                            </button>
                                            {
                                                paginacao.map((_, indice) => {
                                                    return (
                                                        <Link 
                                                            to={'/'} 
                                                            className={`w-full round px-4 py-2 text-base text-indigo-500 hover:bg-gray-100 ${paginaAtual === indice + 1? 'bg-gray-200' : ''}`} 
                                                            key={indice + 1}
                                                            onClick={() => lidarComPaginacao(indice + 1)}
                                                        >{indice + 1}</Link>
                                                    )
                                                })
                                            }
                                            <button 
                                                onClick={lidaComPaginacaoProximo}
                                                type="button" 
                                                className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                                            >
                                                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )
                                : <></>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
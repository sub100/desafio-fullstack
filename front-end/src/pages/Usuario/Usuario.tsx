import React from "react";
import FormGroup from "../../components/FormGroup/FormGroup";
import Input from "../../components/Input/Input";
import validarFormulario from "../../utils/validarFormulario";
import validarCampoCep from "../../utils/validarCampoCep";
import UsuarioController from "../../controller/UsuarioController";
import { Link, useNavigate } from "react-router-dom";

interface Error {
    campo: string;
    mensagem: string;
}

const Usuario = () => {
    const navigate = useNavigate();
    const [ cep, setCep ] = React.useState<string>('');
    const [ rua, setRua ] = React.useState<string>('');
    const [ cidade, setCidade ] = React.useState<string>('');
    const [ bairro, setBairro ] = React.useState<string>('');
    const [ estado, setEstado ] = React.useState<string>('');

    const [errors, setErrors] = React.useState<Error[]>([]);

    async function lidarComCep(evento: React.MouseEvent<HTMLInputElement>) {
        setCep(evento.target.value);

        const valorCep = evento.target.value.replace(/\D/g, '');
        const cepEhValido = validarCampoCep(valorCep, errors, setErrors);
        if (cepEhValido === false) {
            return;
        }

        if ( cepEhValido ) {
            setErrors(prevState => {
                delete prevState['cep'];
                return prevState;
            });
        }
        
        const requisicao = await fetch(`https://viacep.com.br/ws/${valorCep}/json`);
        const dados = await requisicao.json();
        if (dados.erro) {
            setErrors(prevState => {
                const estadoAnterior = prevState;
                estadoAnterior['cep'] = { campo: 'cep', mensagem: 'CEP não encontrado' } as Error;
                return estadoAnterior;    
            });
            return;
        }

        setCep(dados.cep);
        setRua(dados.logradouro);
        setCidade(dados.localidade);
        setBairro(dados.bairro);
        setEstado(dados.uf);
    }

    function lidarComSubmit(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        const formData = new FormData(evento.currentTarget);
        const data = Object.fromEntries(formData);
        const formEhValido = validarFormulario(data, errors, setErrors);
        if ( formEhValido ) {
            UsuarioController.cadastrar(data)
                .then(resposta => {
                    if ( resposta.errors ) {
                        alert(JSON.stringify(resposta.errors));
                        return
                    }

                    return navigate('/');
                });
            return setErrors([]);
        }
    }

    function mensagemDeErroPeloNomeDoCampo(campo: string) {
        if ( errors.length === 0 ) return null;
        return errors[campo]?.mensagem ?? null;
    }

    return (
        <div className="max-w-2xl mx-auto my-4 bg-white p-10 drop-shadow-sm">
            <form onSubmit={lidarComSubmit}>
                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                    <FormGroup>
                        <Input 
                            erro={mensagemDeErroPeloNomeDoCampo('nome')}
                            placeholder="Nome" 
                            required={true}
                            id="nome"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            erro={mensagemDeErroPeloNomeDoCampo('cpf')}
                            placeholder="xxx.xxx.xxx-xx" 
                            label="CPF"
                            required={true}
                            id="cpf"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            erro={mensagemDeErroPeloNomeDoCampo('telefone')}
                            placeholder="(xx) xxxxx-xxxx" 
                            required={true}
                            label="Telefone"
                            id="telefone"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            erro={mensagemDeErroPeloNomeDoCampo('dataNascimento')}
                            placeholder="xx/xx/xxxx" 
                            label="Data de nascimento"
                            required={true}
                            id="dataNascimento"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            placeholder="Nome da mãe" 
                            id="nomeMae"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            placeholder="Nome do Pai" 
                            id="nomePai"
                        />
                    </FormGroup>
                </div>
                <hr />
                <div className="grid gap-6 my-6 lg:grid-cols-2">
                    <FormGroup>
                        <Input 
                            erro={mensagemDeErroPeloNomeDoCampo('cep')}
                            placeholder="xxxxx-xxx"
                            label="CEP"
                            onChange={lidarComCep}
                            required={true}
                            value={cep}
                            id="cep"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            placeholder="Rua" 
                            value={rua}
                            erro={mensagemDeErroPeloNomeDoCampo('rua')}
                            onChange={evento => setRua(evento.target.value)}
                            cursor='cursor-not-allowed'
                            required={true}
                            id="rua"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            placeholder="Cidade" 
                            value={cidade}
                            erro={mensagemDeErroPeloNomeDoCampo('cidade')}
                            cursor='cursor-not-allowed'
                            onChange={evento => setCidade(evento.target.value)}
                            required={true}
                            id="cidade"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            placeholder="Bairro" 
                            value={bairro}
                            erro={mensagemDeErroPeloNomeDoCampo('bairro')}
                            onChange={evento => setBairro(evento.target.value)}
                            cursor='cursor-not-allowed'
                            required={true}
                            id="bairro"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            placeholder="Estado" 
                            erro={mensagemDeErroPeloNomeDoCampo('estado')}
                            onChange={evento => setEstado(evento.target.value)}
                            value={estado}
                            customClassName='cursor-not-allowed'
                            required={true}
                            id="estado"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            erro={mensagemDeErroPeloNomeDoCampo('numero')}
                            placeholder="Numero" 
                            required={true}
                            id="numero"
                        />
                    </FormGroup>
                </div>
                <hr />
                <FormGroup className="my-6">
                    <Input 
                        erro={mensagemDeErroPeloNomeDoCampo('email')}
                        placeholder="Email" 
                        type="email"
                        required={true}
                        id="email"
                    />
                </FormGroup>
                <FormGroup className="my-6">
                    <Input 
                        erro={mensagemDeErroPeloNomeDoCampo('senha')}
                        label="Senha"
                        placeholder="•••••••••" 
                        type="password"
                        required={true}
                        minLength={8}
                        id="senha"
                    />
                </FormGroup>
                <FormGroup className="my-6">
                    <Input 
                        erro={mensagemDeErroPeloNomeDoCampo('confirmarSenha')}
                        label="Confirmar Senha"
                        placeholder="•••••••••" 
                        type="password"
                        required={true}
                        minLength={8}
                        id="confirmarSenha"
                    />
                </FormGroup>
                <button type="submit" className="transition-colors text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-2">Cadastrar</button>
                <Link to="/" className="transition-colors text-indigo-600 hover:text-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-indigo-200">Voltar</Link>
            </form>
        </div>
    );
}

export default Usuario;
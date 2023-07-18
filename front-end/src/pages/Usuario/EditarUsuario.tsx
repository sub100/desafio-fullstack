import React from "react";
import FormGroup from "../../components/FormGroup/FormGroup";
import Input from "../../components/Input/Input";
import validarFormulario from "../../utils/validarFormulario";
import validarCampoCep from "../../utils/validarCampoCep";
import UsuarioController from "../../controller/UsuarioController";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Error {
    campo: string;
    mensagem: string;
}

const EditarUsuario = () => {
    const navigate = useNavigate();
    const [ cep, setCep ] = React.useState<string>('');
    const [ cpf, setCpf ] = React.useState<string>('');
    const [ nome, setNome ] = React.useState<string>('');
    const [ email, setEmail ] = React.useState<string>('');
    const [ telefone, setTelefone ] = React.useState<string>('');
    const [ dataNascimento, setDataNascimento ] = React.useState<string>('');
    const [ pai, setPai ] = React.useState<string>('');
    const [ mae, setMae ] = React.useState<string>('');
    const [ rua, setRua ] = React.useState<string>('');
    const [ cidade, setCidade ] = React.useState<string>('');
    const [ bairro, setBairro ] = React.useState<string>('');
    const [ estado, setEstado ] = React.useState<string>('');
    const [ numero, setNumero ] = React.useState<string>('');

    const { id } = useParams();
    React.useEffect(() => {
        UsuarioController.buscarPorId(id)
            .then(resposta => {
                setNome(resposta.nome);
                setTelefone(resposta.telefone);
                setDataNascimento(format(
                    new Date(resposta.data_nascimento), 
                    'dd/MM/yyyy'
                ));
                setMae(resposta.mae);
                setPai(resposta.pai);
                setCpf(resposta.cpf);
                setCep(resposta.cep);
                setRua(resposta.rua);
                setCidade(resposta.cidade);
                setBairro(resposta.bairro);
                setEstado(resposta.estado);
                setNumero(resposta.numero);
            });
    }, [id]);

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
        if ( data.senha === '' ) {
            delete data.senha;
            delete data.confirmarSenha;
        }

        data.data_nascimento = data.dataNascimento;
        data.mae = data.nomeMae;
        data.pai = data.nomePai;
        
        const formEhValido = validarFormulario(data, errors, setErrors);
        if ( formEhValido ) {
            UsuarioController.atualizar(+id, data)
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
                            value={nome}
                            onChange={evento => setNome(evento.target.value)}
                            required={true}
                            id="nome"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            erro={mensagemDeErroPeloNomeDoCampo('cpf')}
                            placeholder="xxx.xxx.xxx-xx" 
                            label="CPF"
                            value={cpf}
                            onChange={evento => setCpf(evento.target.value)}
                            required={true}
                            id="cpf"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            erro={mensagemDeErroPeloNomeDoCampo('telefone')}
                            placeholder="Telefone" 
                            value={telefone}
                            onChange={evento => setTelefone(evento.target.value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3"))}
                            required={true}
                            id="telefone"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            erro={mensagemDeErroPeloNomeDoCampo('dataNascimento')}
                            placeholder="xx/xx/xxxx" 
                            value={dataNascimento}
                            onChange={evento => setDataNascimento(evento.target.value)}
                            label="Data de nascimento"
                            required={true}
                            id="dataNascimento"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            placeholder="Nome da mãe" 
                            value={mae}
                            onChange={evento => setMae(evento.target.value)}
                            id="nomeMae"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            placeholder="Nome do Pai" 
                            value={pai}
                            onChange={evento => setPai(evento.target.value)}
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
                            required={true}
                            id="rua"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            placeholder="Cidade" 
                            value={cidade}
                            erro={mensagemDeErroPeloNomeDoCampo('cidade')}
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
                            required={true}
                            id="estado"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            erro={mensagemDeErroPeloNomeDoCampo('numero')}
                            placeholder="Numero" 
                            value={numero}
                            onChange={evento => setNumero(evento.target.value)}
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
                        value={email}
                        onChange={evento => setEmail(evento.target.value)}
                        id="email"
                    />
                </FormGroup>
                <FormGroup className="my-6">
                    <Input 
                        erro={mensagemDeErroPeloNomeDoCampo('senha')}
                        label="Senha"
                        placeholder="•••••••••" 
                        type="password"
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
                        minLength={8}
                        id="confirmarSenha"
                    />
                </FormGroup>
                <button type="submit" className="transition-colors text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-2">Atualizar</button>
                <Link to="/" className="transition-colors text-indigo-600 hover:text-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-indigo-200">Voltar</Link>
            </form>
        </div>
    );
}

export default EditarUsuario;
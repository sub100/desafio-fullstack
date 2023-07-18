export default function validarCampoCep(cep, errors, funcaoSetarErros) {
    const erros = {};

    if ( cep.length != 8 ) {
        erros['cep'] = {campo: 'cep', mensagem: 'CEP inválido'};
    }

    funcaoSetarErros(prevState => ({...prevState, ...erros}));

    return Object.keys(erros).length === 0;
}
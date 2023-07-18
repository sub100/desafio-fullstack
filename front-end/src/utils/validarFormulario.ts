export default function validarFormulario(camposFormulario, errors, funcaoSetarErros) {
    const erros = {};

    if ( camposFormulario.senha ) {
        (camposFormulario?.senha.length < 8  
            ? erros['senha'] = {campo: 'senha', mensagem: 'Senhas deve conter mais de 8 caracteres'}
            : ''
        );
    }

    if ( camposFormulario.senha ) {
        (camposFormulario?.senha === camposFormulario?.confirmarSenha 
            ? '' 
            : erros['confirmarSenha'] = {campo: 'confirmarSenha', mensagem: 'Senhas não conferem'}
        );
    }

    (camposFormulario?.cpf.length > 14 || camposFormulario.cpf.length <= 13
        ? erros['cpf'] = {campo: 'cpf', mensagem: 'CPF contém mais de 11 dígitos!'}
        : ''
    );
    
    (camposFormulario?.telefone.length > 15 || camposFormulario.telefone.length <= 13
        ? erros['telefone'] = {campo: 'telefone', mensagem: 'Telefone contém mais de 11 dígitos!'}
        : delete erros['telefone'] && delete errors['telefone']
    );
    
    funcaoSetarErros(prevState => ({...prevState, ...erros}));
    
    return Object.keys(erros).length === 0;
}

$('#formUsuario').on('submit', function() {

    if (!validacoesForm()) {
        return false;
    }
  
    var dataRequest = $('#formUsuario').serialize();
    $.post("controller/usuarioController.php", dataRequest, function(dataResponse) {

      try {
        var response = JSON.parse(dataResponse);
      } catch (ex) {
        console.log(ex);
        console.log(dataResponse);
        alert("Erro");
      }
      alert(response.mensagem);
      window.location.href='?pg=usuario-list';
        
    }).fail(function() {
        alert("Erro");
    });

    return false;
});

function validacoesForm() {

    if($("#formUsuario #cpf")[0].value.length > 0 && $("#formUsuario #cpf")[0].value.length < 14) {
        alert('Campo [ CPF ] não preenchido corretamente');
        $("#formUsuario #cpf")[0].focus();
        return false;
    }

    if($("#formUsuario #cep")[0].value.length > 0 && $("#formUsuario #cep")[0].value.length < 8) {
        alert('Campo [ CEP ] não preenchido corretamente');
        $("#formUsuario #cep")[0].focus();
        return false;
    }

    return true;

}

function maskCpf() {
    $("#cpf").mask("999.999.999-99");
}

$("#cpf").keyup(function(event){
    try {
        $("#cpf").unmask();
    } catch (e) {}

    maskCpf();

    var elem = this;
    setTimeout(function(){
        elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    var currentValue = $(this).val();
    $(this).val('');
    $(this).val(currentValue);
});

maskCpf();

function maskCep() {
    $("#cep").mask("99999-999");
}

$("#cep").keyup(function(event){
    try {
        $("#cep").unmask();
    } catch (e) {}

    maskCep();

    var elem = this;
    setTimeout(function(){
        elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    var currentValue = $(this).val();
    $(this).val('');
    $(this).val(currentValue);
});

maskCep();


$(document).ready(function() {

    function limpa_formulário_cep() {
        $("#logradouro").val("");
        $("#bairro").val("");
        $("#localidade").val("");
        $("#uf").val("");
    }
    
    $("#cep").blur(function() {

        var cep = $(this).val().replace(/\D/g, '');

        if (cep != "") {

            var validacep = /^[0-9]{8}$/;

            if(validacep.test(cep)) {

                $("#logradouro").val("...");
                $("#bairro").val("...");
                $("#localidade").val("...");
                $("#uf").val("...");

                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        $("#logradouro").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#localidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                    }
                    else {
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            }
            else {
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        }
        else {
            limpa_formulário_cep();
        }
    });
});
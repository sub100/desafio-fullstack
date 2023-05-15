var ultimaalteracao = null;
var idalteracao = null;
var dataTableUsuarios = null;

$(document).ready(function () {
    dataTableUsuarios = 
        $('#dtUsuarios').DataTable({
            order: [[7, 'desc']],
            ajax: 'controller/usuarioController.php?acao=listUsuarios',
        });
});

$(document).on("click",'.btnDelete',function(){

    btnDelete = this;

    var dataRequest = {
        "acao": "delete", 
        "id": $(this).attr('id')
    };
    $.post("controller/usuarioController.php", dataRequest, function(dataResponse) {

        try {
            var response = JSON.parse(dataResponse);
            $(btnDelete).closest('tr').remove(); 
        } catch (ex) {
            console.log(ex);
            console.log(dataResponse);
            alert("Erro");
        }
        alert(response.mensagem);
        
    })
    .fail(function() {
        alert("Erro");
    });
    
});

function verificaAlteracoes() {
    var dataRequest = {
        "acao": "verificaAlteracoes", 
    };
    $.post("controller/usuarioController.php", dataRequest, function(dataResponse) {
    
        try {
            var response = JSON.parse(dataResponse);

            if ((ultimaalteracao != null && 
                ultimaalteracao != response.dataalteracao) ||
                (idalteracao != null &&
                idalteracao != response.id)) {
                dataTableUsuarios.ajax.reload();
            } 
            ultimaalteracao = response.dataalteracao;
            idalteracao = response.id;

        } catch (ex) {
            console.log(ex);
            console.log(dataResponse);
            alert("Erro");
        }
        
    })
    .fail(function() {
        alert("Erro");
    });
}

$(document).ready(function () {

    verificaAlteracoes(); 
    serverPoll = setInterval( function()
    {
        verificaAlteracoes(); 
    }, 5000);
     
});
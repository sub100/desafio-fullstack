$(document).ready(function () {
    $('#dtUsuarios').DataTable({
        order: [[7, 'desc']],
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
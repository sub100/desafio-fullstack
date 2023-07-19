$(document).ready(function () {
    $('.cpf').mask('000.000.000-00');
    $('.cep').mask('00000-000');

    $('.cep').change(function (event) {
        let cep = $(this).val();
        $('#loading').show();
        $.ajax({
            url: 'https://viacep.com.br/ws/' + cep + '/json',
            type: 'POST',
            dataType: 'jsonp',
            data: {
                cep: cep
            },
        })
            .done(function (s) {
                $('.cidade').val(s['localidade']);
                $('.uf').val(s['uf']);
                $('.logradouro').val(s['logradouro']);
                $('.bairro').val(s['bairro']);
            })
            .fail(function () {
                $('#loading').hide(1000);
            })
            .always(function () {
                $('#loading').hide(1000);
            });
    });

    listar();
});

function listar() {
    $('#loading').show();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'GET',
        url: 'usuario/listar',
    })
        .done(function (s) {
            $('#loading').hide(1000);
            let usuarios;
            $.each(s, function (key, val) {
                usuarios += '<tr>';
                usuarios += '<td>' + val.nome + '</td>';
                usuarios += '<td>';
                usuarios += '<a class="btn btn-warning" onclick="editar(' + val.id + ')" style="margin-right: 15px;"> Editar</a>';
                usuarios += '<button class="btn btn-danger" data-toggle="modal" data-bs-toggle="modal" data-bs-target="#excluir' + val.id + '"> Excluir</button>';
                usuarios += '<div class="modal fade" id="excluir' + val.id + '" tabindex="-1" aria-labelledby="excluirModalLabel' + val.id + '" aria-hidden="true">';
                usuarios += '<div class="modal-dialog">';
                usuarios += '<div class="modal-content">';
                usuarios += '<div class="modal-header">';
                usuarios += '<h1 class="modal-title fs-5" id="excluirModalLabel' + val.id + '">Deseja realmente excluir esse usuário?</h1>';
                usuarios += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
                usuarios += '</div>';
                usuarios += '<div class="modal-footer">';
                usuarios += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>';
                usuarios += '<button type="button" class="btn btn-primary" onclick="excluir(' + val.id + ')">Confirmar</button>';
                usuarios += '</div>';
                usuarios += '</div></div></div></td></tr>';
            });
            $("#tblUsuarios").html(usuarios);
        })
        .always(function () {
            $('#loading').hide(1000);
        });
}

function salvar() {
    $('#loading').show();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: 'usuario/salvar',
        data: $('#form').serialize(),
    })
        .done(function (s) {
        })
        .fail(function () {
            $('#loading').hide(1000);
        })
        .always(function () {
            $('#adicionar').modal('hide');
            limparCampos();
            $('#loading').hide(1000);
            listar();
        });
}

function editar(id) {
    $('#loading').show();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'GET',
        url: 'usuario/editar/' + id,
    })
        .done(function (s) {
            $('#loading').hide(1000);

            $('.id').val(s.id);
            $('.nome').val(s.nome);
            $('.cpf').val(s.cpf);
            $('.rg').val(s.rg);
            $('.cep').val(s.cep);
            $('.cidade').val(s.cidade);
            $('.uf').val(s.uf);
            $('.logradouro').val(s.logradouro);
            $('.bairro').val(s.bairro);
            $('.numero').val(s.numero);
            $('.complemento').val(s.complemento);
            $('.parentesco').val(s.parentesco);
            $('.parentesco').val(s.parentesco);

            var modal = new bootstrap.Modal(document.getElementById('editar'));
            modal.show();
        })
        .fail(function () {
            $('#loading').hide(1000);
        });
}

function atualizar() {
    $('#loading').show();
    let id = $('.id').val();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'PUT',
        url: 'usuario/atualizar/' + id,
        data: $('#form').serialize(),
    })
        .done(function (s) {
            $('#loading').hide(1000);
            console.log(s);
        })
        .fail(function () {
            $('#loading').hide(1000);
        })
        .always(function () {
            $('#editar').modal('hide');
            limparCampos();
            listar();
        });
}

function excluir(id) {
    $('#loading').show();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: 'usuario/excluir/' + id,
    })
        .done(function (s) {
            $('#loading').hide(1000);
        })
        .fail(function () {
            $('#loading').hide(1000);
        })
        .always(function () {
            $('#excluir' + id).modal('hide');
            listar();
        });
}

function limparCampos() {
    $('.id').val('');
    $('.nome').val('');
    $('.cpf').val('');
    $('.rg').val('');
    $('.cep').val('');
    $('.cidade').val('');
    $('.uf').val('');
    $('.logradouro').val('');
    $('.bairro').val('');
    $('.numero').val('');
    $('.complemento').val('');
    $('.parentesco').val('');
}



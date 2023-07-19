<x-guest-layout>
    <div class="container">
        <h1 class="h3 mb-2 text-gray-800">Usuários</h1>
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active" aria-current="page">Inicio</li>
                    </ol>
                </nav>
            </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody id="tblUsuarios">
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#adicionar">
                        Adicionar
                    </button>
                    <!-- Modal -->
                    <div class="modal fade" id="adicionar" tabindex="-1" aria-labelledby="adicionarLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="adicionarLabel">Adicionar</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            <div class="modal-body">
                                <form id="form">
                                    @include('components.usuarios._form')
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="limparCampos()">Cancelar</button>
                                <button type="button" class="btn btn-primary" onclick="salvar()">Salvar</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <!-- Modal -->
                    <div class="modal fade" id="editar" tabindex="-1" aria-labelledby="editarLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="editarLabel">Editar</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            <div class="modal-body">
                                <form id="formEditar">
                                    @include('components.usuarios._form')
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="limparCampos()">Cancelar</button>
                                <button type="button" class="btn btn-primary" onclick="atualizar()">Atualizar</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-gest-layout>

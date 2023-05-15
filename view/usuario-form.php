<form method="post" id="formUsuario">
    <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" name="nome" id="nome" required>
    </div>
    <div class='row'>
        <div class='col'>
            <div class="form-group">
                <label for="datanascimento">Data nascimento</label>
                <input type="date" class="form-control" name="datanascimento" id="datanascimento" required>
            </div>
        </div>
        <div class='col'>
            <div class="form-group">
                <label for="sexo">Sexo</label>
                <div class='form-check'>
                    <input type="radio" value="M" class="form-check-input" name="sexo" id="sexo_m" required> <label for="sexo_m">Masculino</label>
                <div class='form-check'>
                </div>
                    <input type="radio" value="F" class="form-check-input" name="sexo" id="sexo_f" required> <label for="sexo_f">Feminino</label>
                </div>
            </div>
        </div>
        <div class='col'>
            <div class="form-group">
                <label for="cpf">CPF</label>
                <input type="text" class="form-control" name="cpf" id="cpf" required>
            </div>
        </div>
    </div>
    <div class='row'>
        <div class='col-3'>
            <div class="form-group">
                <label for="cep">CEP</label>
                <input type="text" class="form-control" name="cep" id="cep" required>
            </div>
        </div>
        <div class='col-7'>
            <div class="form-group">
                <label for="logradouro">Logradouro</label>
                <input type="text" class="form-control" name="logradouro" id="logradouro" required>
            </div>
        </div>
        <div class='col-2'>
            <div class="form-group">
                <label for="numero">Número</label>
                <input type="text" class="form-control" name="numero" id="numero" required>
            </div>
        </div>
    </div>
    <div class='row'>
        <div class='col'>
            <div class="form-group">
                <label for="complemento">Complemento</label>
                <input type="text" class="form-control" name="complemento" id="complemento">
            </div>
        </div>
        <div class='col'>
            <div class="form-group">
                <label for="bairro">Bairro</label>
                <input type="text" class="form-control" name="bairro" id="bairro" required>
            </div>
        </div>
    </div>
    <div class='row'>
        <div class='col-10'>
            <div class="form-group">
                <label for="localidade">Localidade</label>
                <input type="text" class="form-control" name="localidade" id="localidade" required>
            </div>
        </div>
        <div class='col-2'>
            <div class="form-group">
                <label for="uf">UF</label>
                <select name="uf" id="uf" class="form-control" required>
                    <option value="">-- Escolha --</option>
                    <?php
                    $estados = array(
                        'AC'=>'Acre',
                        'AL'=>'Alagoas',
                        'AP'=>'Amapá',
                        'AM'=>'Amazonas',
                        'BA'=>'Bahia',
                        'CE'=>'Ceará',
                        'DF'=>'Distrito Federal',
                        'ES'=>'Espírito Santo',
                        'GO'=>'Goiás',
                        'MA'=>'Maranhão',
                        'MT'=>'Mato Grosso',
                        'MS'=>'Mato Grosso do Sul',
                        'MG'=>'Minas Gerais',
                        'PA'=>'Pará',
                        'PB'=>'Paraíba',
                        'PR'=>'Paraná',
                        'PE'=>'Pernambuco',
                        'PI'=>'Piauí',
                        'RJ'=>'Rio de Janeiro',
                        'RN'=>'Rio Grande do Norte',
                        'RS'=>'Rio Grande do Sul',
                        'RO'=>'Rondônia',
                        'RR'=>'Roraima',
                        'SC'=>'Santa Catarina',
                        'SP'=>'São Paulo',
                        'SE'=>'Sergipe',
                        'TO'=>'Tocantins'
                    );
                    foreach ($estados as $uf => $nome) {
                        echo "<option value='$uf'";
                        //if ($linhaBeneficiario["estado"] == $uf)
                            //echo " selected ";
                        echo ">$nome</option>";
                    }

                    ?>
                </select>
            </div>
        </div>
    </div>
    <div class="form-group">
        <label for="parentesco">Parentesco</label>
        <select name="parentesco" id="parentesco" class="form-control" required>
            <option value="">-- Escolha --</option>
            <option value="P" <?php if ($linhaBeneficiario["parentesco"] == "P") echo "selected"; ?> >Pai</option>
            <option value="M" <?php if ($linhaBeneficiario["parentesco"] == "M") echo "selected"; ?> >Mãe</option>
            <option value="F" <?php if ($linhaBeneficiario["parentesco"] == "F") echo "selected"; ?> >Filho</option>
        </select>
    </div>
    <div class="form-group">
        <label>Data alteração</label>
        <label></label>
    </div>

    <input type="hidden" name="id">
    <button type="submit" class="btn btn-primary">Salvar</button>
</form>
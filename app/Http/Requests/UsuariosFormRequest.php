<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsuariosFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nome' => 'required|min:3|max:50',
            'cpf' => 'required|size:14',
            'rg' => 'required|min:1|max:50',
            'cep' => 'required|size:9',
            'cidade' => 'required|min:3|max:100',
            'uf'  => 'required|size:2|string',
            'logradouro' => 'required|min:3|max:100',
            'bairro' => 'required|min:3|max:100',
            'numero' => 'required|integer',
            'complemento' => 'max:100',
            'parentesco' => 'max:100',
        ];
    }
}

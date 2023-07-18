<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usuario>
 */
class UsuarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create('pt_BR');

        return [
            'nome' => $faker->name,
            'email' => $faker->unique()->safeEmail,
            'senha' => bcrypt('password'),
            'cep' => $faker->postcode,
            'rua' => $faker->streetName,
            'numero' => $faker->buildingNumber,
            'bairro' => $faker->citySuffix,
            'cidade' => $faker->city,
            'estado' => $faker->stateAbbr,
            'data_nascimento' => $faker->date(),
            'telefone' => $faker->phoneNumber,
            'cpf' => $faker->cpf,
            'mae' => $faker->name,
            'pai' => $faker->name,

        ];
    }
}

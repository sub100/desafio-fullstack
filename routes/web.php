<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsuariosController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [UsuariosController::class, 'index'])->name('usuarios');
Route::get('/usuario/listar', [UsuariosController::class, 'listar'])->name('usuarios');
Route::post('/usuario/salvar', [UsuariosController::class, 'salvar'])->name('usuario.salvar');
Route::get('/usuario/editar/{id}', [UsuariosController::class, 'editar'])->name('usuario.editar');
Route::put('/usuario/atualizar/{id}', [UsuariosController::class, 'atualizar'])->name('usuario.atualizar');
Route::post('/usuario/excluir/{id}', [UsuariosController::class, 'excluir'])->name('excluir.deletar');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

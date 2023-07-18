<?php

use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/usuarios', [UsuarioController::class, 'criarUsuario']);
Route::get('/usuarios', [UsuarioController::class, 'listarTodosOsUsuarios']);
Route::get(
    '/usuarios/{id}',
    [UsuarioController::class, 'listarUsuario']
)->where('id', '[0-9]+');

Route::put(
    '/usuarios/{id}',
    [UsuarioController::class, 'atualizarUsuario']
)->where('id', '[0-9]+');

Route::delete(
    '/usuarios/{id}',
    [UsuarioController::class, 'excluirUsuario']
)->where('id', '[0-9]+');

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

<?php

use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
// routes/api.php
use App\Http\Controllers\ChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


Route::post('/chat', [ChatController::class, 'chatFn'])->middleware(['auth:sanctum']);
Route::post('/voice', [ChatController::class, 'handleVoice'])->middleware(['auth:sanctum']);



Route::post('/login', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($validated)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    $user = $request->user();
    $token = $user->createToken('react-frontend')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $user,
    ]);
});


Route::get('/check', function () {
    return redirect('/');
})->middleware(['auth:sanctum']);


Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

<?php
use Illuminate\Support\Facades\Route;

// routes/api.php
use App\Http\Controllers\ChatController;

Route::post('/chat', [ChatController::class, 'chatFn']);




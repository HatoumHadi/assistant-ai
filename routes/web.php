<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index']);

Route::fallback(function () {
    return redirect('/');
});

Route::get('/signin', function (){
    return redirect('/');
});


Route::get('/storage/reports/{filename}', function ($filename) {
    $path = 'reports/' . $filename;

    if (!Storage::disk('public')->exists($path)) {
        abort(404);
    }

    return response()->file(storage_path('app/public/' . $path), [
        'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition' => 'inline; filename="'.$filename.'"'
    ]);
});

<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('layouts.app');
});

Route::view('/{any}', 'layouts.app')->where('any', '.*');

// Auth::routes();


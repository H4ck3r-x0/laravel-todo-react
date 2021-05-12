<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

Route::post('/login', function (Request $request) {
    
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return [
        'token' => $user->createToken($request->email)->plainTextToken,
        'user' => $user
    ];
});


Route::middleware('auth:sanctum')->post('/logout', function(Request $request) {
    $user = $request->user();
    $user->tokens()
        ->where('id', $user->currentAccessToken()->id)
        ->delete();
});

Route::middleware('auth:sanctum')->get('/ouruser', function(Request $request) {
    return $request->user();
});
















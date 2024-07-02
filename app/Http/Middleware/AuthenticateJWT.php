<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateJWT
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
       try	{
        $user = JWTAuth::parseToken()->authenticate();
       } catch(Exception $e){
					if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
						$newToken = JWTAuth::parseToken()->refresh();
						return response()->json(['status' => 'Token is Invalid', 'new_token' => $newToken]);
					}
					if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
						return response()->json(['status' => 'Token is Expired']);
					}
       		return response()->json(['status' => 'Token not found']);
       }
			 return $next($request);
    }
}

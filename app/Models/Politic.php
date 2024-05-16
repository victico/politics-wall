<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Politic extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 
        'office', 
        'age', 
        'since', 
        'status', 
        'vote_jail', 
        'vote_no_jail', 
        'normal_photo', 
        'jail_photo'
    ];
}

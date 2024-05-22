<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Politic extends Model
{
    use HasFactory, SoftDeletes;
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

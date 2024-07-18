<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Opinion extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [ 'institution', 'title', 'author', 'opinion', 'photo'];
}

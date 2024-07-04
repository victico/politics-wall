<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Politic extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'name', 
        'office', 
        'since', 
        'political_party',
        'status', 
        'vote_jail', 
        'vote_no_jail', 
        'normal_photo', 
        'jail_photo'
    ];
    
    public function crimes(): HasMany
    {
        return $this->hasMany(Crime::class, 'user_id', 'id');
    }
}

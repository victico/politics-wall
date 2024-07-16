<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Crime extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'title', 
        'description', 
        'references', 
        'user_id',
    ];
    public function politic(): BelongsTo
    {
        return $this->belongsTo(Politic::class, 'user_id', 'id');
    }
}

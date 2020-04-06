<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bort extends Model
{
    
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'bort_model_id',
        'bort_type_id',
        'departament_id',
        'bort_number',
        'status',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function model(){
        return $this->hasOne('App\Models\Bort_model', 'id', 'bort_model_id');
    }
    public function type(){
        return $this->hasOne('App\Models\Bort_type', 'id', 'bort_type_id');
    }
    public function departament(){
        return $this->hasOne('App\Models\Departament', 'id', 'departament_id');
    }
}
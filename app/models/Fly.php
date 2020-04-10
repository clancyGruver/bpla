<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fly extends Model
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
        'departament_id',
        'bort_id',
        'target_id',
        'pilot_id',
        'fly_date',
        'time_start',
        'time_end',
        'time_fly',
        'wind_speed',
        'temperature',
        'fly_square',
        'result',
        'raion_okato',
        'np_okato',
        'raion_description',
        'mode',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function departament(){
        return $this->hasOne('App\Models\Departament', 'id', 'departament_id');
    }
    public function bort(){
        return $this->hasOne('App\Models\Bort', 'id', 'bort_id');
    }
    public function target(){
        return $this->hasOne('App\Models\Target', 'id', 'target_id');
    }
    public function pilot(){
        return $this->hasOne('App\Models\Pilot', 'id', 'pilot_id');
    }
    public function raion(){
        return $this->hasOne('App\Models\Administrative', 'code', 'raion_okato');
    }
    public function np(){
        return $this->hasOne('App\Models\Administrative', 'code', 'np_okato');
    }
}
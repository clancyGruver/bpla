export default{
    all: state => state.all,
    one: state => id => state.all.find( el => el.id ==id ),
    pilot: state => pilotId => state.all.find( el => el.pilot_id == pilotId ),
}
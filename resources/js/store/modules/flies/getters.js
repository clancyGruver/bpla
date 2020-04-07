export default{
    all: state => state.all,
    oneBort: (id) => state.all.find( el => el.id ==id ),
    types: state => state.types,
    models: state => state.models,
}
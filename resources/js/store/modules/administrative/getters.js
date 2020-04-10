export default{
    all: state => state.all,
    states: state => state.all.sort(),
    np: state => state.nps.sort(),
}
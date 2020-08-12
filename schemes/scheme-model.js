const db = require('../data/db-config.js')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find(){
    return db('schemes')
}
function findById(id){
    return db('schemes')
            .where({id})
            .first()
}
function findSteps(id){
    return db('steps as s')
        .select('s.id','sc.scheme_name','s.step_number','s.instructions')
        .join('schemes as sc', 's.scheme_id', '=', 'sc.id' )
        .where({'scheme_id' : id})
        .orderBy('step_number')

}
function add(scheme){
    return db("schemes")
            .insert(scheme)
            .returning("id")
            .then(ids => {
                const id = ids[0];

                return findById(id);
            })

}
function update(changes, id){
    return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
        return findById(id);
    });
}
function remove(id){
    return db("schemes")
    .where({ id })
    .del();
}
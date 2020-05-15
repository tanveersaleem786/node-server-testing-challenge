const db = require("../data/config")

function getUsers() {
    return db("users")
}

function find(filter) {
    return db("users").where(filter)
}

function create(user) {
    return db("users").insert(user)
}

function remove(id) {
    return db("users").where("id",id).del()
}

module.exports = {
    getUsers,
    find,
    create,
    remove
}

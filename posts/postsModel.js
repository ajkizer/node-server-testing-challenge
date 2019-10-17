const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db("posts").select("id", "title", "body");
}

function findBy(filter) {}

function findById(id) {
  return db("posts")
    .where({ id })
    .first();
}

function add(post) {
  return db("posts")
    .insert(post)
    .then(ids => {
      return db("posts")
        .where({ id: ids[0] })
        .first();
    });
}

function update(id, changes) {
  return db("posts")
    .where({ id })
    .first()
    .update(changes);
}

function remove(id) {
  return db("posts")
    .where("id", id)
    .del();
}

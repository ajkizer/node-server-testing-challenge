exports.up = function(knex) {
  return knex.schema.createTable("posts", posts => {
    posts.increments();

    posts
      .string("title", 128)
      .notNullable()
      .unique();

    posts.string("body").notNullable();
  });
};

exports.down = function(knex) {};

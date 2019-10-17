const Posts = require("./postsModel");
const db = require("../data/dbConfig");

describe("The Posts Model", () => {
  beforeEach(async () => {
    await db("posts").truncate();
  });

  describe("the add function", async () => {
    it("adds an entry", async () => {
      const postData = { title: "test", body: "test body" };
      const post = await Posts.add(postData);
      const posts = await db("posts");
      expect(posts.length).toBe(1);
      expect(posts[0].title).toBe("test");
    });

    it("should resolve to the newly created post", async () => {
      const postData = { title: "test", body: "test body" };
      const post = await Posts.add(postData);
      expect(post).toEqual({ id: 1, title: "test", body: "test body" });
    });
  });

  describe("the find function", async () => {
    it("resolves to list of all posts", async () => {
      const postData1 = { title: "test1", body: "test1 body" };
      const postData2 = { title: "test2", body: "test2 body" };
      await Posts.add(postData1);
      await Posts.add(postData2);
      const allPosts = await Posts.find();
      expect(allPosts.length).toEqual(2);
    });

    it("each object contains an id, title, and body", async () => {
      const postData = { title: "test", body: "test body" };
      await Posts.add(postData);
      const allPosts = await Posts.find();
      expect(allPosts[0].id).toEqual(1);
      expect(allPosts[0].title).toEqual("test");
      expect(allPosts[0].body).toEqual("test body");
    });
  });

  describe("the findById function", async () => {
    it("returns the correct post", async () => {
      const postData1 = { title: "test1", body: "test1 body" };
      const postData2 = { title: "test2", body: "test2 body" };
      await Posts.add(postData1);
      await Posts.add(postData2);
      const foundPost = await Posts.findById(1);
      expect(foundPost.id).toEqual(1);
      expect(foundPost.title).toEqual("test1");
    });
  });

  describe("the update function", async () => {
    it("updates the post", async () => {
      const postData = { title: "test1", body: "test1 body" };
      const addedPost = await Posts.add(postData);
      const id = addedPost.id;
      const changes = { title: "test update", body: "test update" };
      await Posts.update(addedPost.id, changes);
      const postById = await db("posts")
        .where({ id })
        .first();
      expect(changes.title).toEqual(postById.title);
    });
  });

  describe("the remove function", async () => {
    it("deletes the post", async () => {
      const postData = { title: "test1", body: "test1 body" };
      const addedPost = await Posts.add(postData);
      expect;
      const id = addedPost.id;
      let postsLength = await Posts.find().length;
      Posts.remove(id);
      postsLength = await Posts.find().length;
      expect(postsLength).toEqual(undefined);
    });
  });
});

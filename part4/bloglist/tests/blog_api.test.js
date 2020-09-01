const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")

const api = supertest(app)
const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test("return all blogs as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("the unique identifier property of the blog posts is named id", async () => {
  const { body } = await api.get("/api/blogs")
  expect(body.length).toBeGreaterThan(0)

  body.forEach(blog => expect(blog.id).toBeDefined())
})

test("a new blog can be post", async () => {
  const newBlog = {
    title: "new test blog",
    author: "Yun Li",
    url: "http://newtestblog.com",
    like: 100
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const res = await api.get("/api/blogs")

  const titles = res.body.map(r => r.title)

  expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain("new test blog")
})

test("a blog without likes, it will default to the value 0", async () => {
  const newBlog = {
    title: "test blog",
    author: "Y.Li",
    url: "http://jshs.com"
  }

  const { body } = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(body.likes).toBe(0)
})

test("a blog without title or url cannot be post", async () => {
  const newBlog = {
    author: "joku nimi",
    likes: 8
  }

  const { body } = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})

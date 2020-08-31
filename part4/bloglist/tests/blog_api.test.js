const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)
const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "test blog 1",
    author: " test author 1",
    url: "http://testblog1.com",
    likes: 6
  },
  {
    title: "test blog 2",
    author: " test author 2",
    url: "http://testblog2.com",
    likes: 6
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
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
  expect(response.body).toHaveLength(initialBlogs.length)
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
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const res = await api.get("/api/blogs")

  const titles = res.body.map(r => r.title)

  expect(res.body).toHaveLength(initialBlogs.length + 1)
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
    .expect(201)
    .expect("Content-Type", /application\/json/)

  expect(body.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})

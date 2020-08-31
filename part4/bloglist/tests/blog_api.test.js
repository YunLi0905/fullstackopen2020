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

afterAll(() => {
  mongoose.connection.close()
})

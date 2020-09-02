const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")

const api = supertest(app)
const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe("when there is initially some blogs saved", () => {
  test("return all blogs as json", async () => {
    console.log("entered test")
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

  test("the likes can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToBeUpdate = blogsAtStart[0]
    console.log("blog to be updated: ", blogToBeUpdate)

    const newBlog = {
      title: blogToBeUpdate.title,
      author: blogToBeUpdate.author,
      url: blogToBeUpdate.url,
      likes: blogToBeUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToBeUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const resultBlog = await api
      .get(`/api/blogs/${blogToBeUpdate.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const processdBlogToView = JSON.parse(JSON.stringify(resultBlog.body))
    expect(processdBlogToView.title).toEqual(newBlog.title)
    expect(processdBlogToView.likes).toEqual(newBlog.likes)

    expect(newBlog.likes).toEqual(blogToBeUpdate.likes + 1)
  })
})

describe("viewing a specific blog", () => {
  test("suceeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const processdBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processdBlogToView)
  })

  test("fails with statuscode 404 if blog does not exist", async () => {
    const validNoneExistingId = await helper.nonExistingId

    console.log(validNoneExistingId)

    await api.get(`/api/blogs/${validNoneExistingId}`).expect(404)
  })

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "83hdasgcixayg7"

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe("addition of a new blog", () => {
  test("a new blog can be post", async () => {
    const newBlog = {
      title: "new test blog",
      author: "Yun Li",
      url: "http://newtestblog.com",
      likes: 100
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
})

describe("deletion of a blog", () => {
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

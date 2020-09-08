const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const jwt = require("jsonwebtoken")

const Blog = require("../models/blog")
const User = require("../models/user")

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const user = await helper.addUser("juho", "secret")
  const blogObjects = helper.initialBlogs
    .map(blog => ({ ...blog, user }))
    .map(blog => new Blog(blog))

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

    expect(processdBlogToView.likes).toEqual(blogToBeUpdate.likes + 1)
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

    await api.get(`/api/blogs/${validNoneExistingId}`).expect(404)
  })

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "83hdasgcixayg7"

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe("addition of a new blog", () => {
  test("a new blog can be post when token is provided", async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      title: "new test blog",
      author: "Yun Li",
      url: "http://newtestblog.com",
      likes: 100,
      user: users[0].id
    }

    const token = jwt.sign(users[0], process.env.SECRET)

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  })

  test("adding a blog fails with proper status code 401 if token is not provided", async () => {
    const newBlog = {
      title: "new test blog",
      author: "Yun Li",
      url: "http://newtestblog.com",
      likes: 100
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test("a blog without likes, it will default to the value 0", async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      title: "test blog",
      author: "Y.Li",
      url: "http://jshs.com",
      user: users[0].id
    }

    const token = jwt.sign(users[0], process.env.SECRET)

    const { body } = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(body.likes).toBe(0)
  })

  test("a blog without title or url cannot be post", async () => {
    const users = await helper.usersInDb()
    const newBlog = {
      author: "joku nimi",
      likes: 8,
      user: users[0].id
    }

    const token = jwt.sign(users[0], process.env.SECRET)

    const { body } = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe("deletion of a blog", () => {
  test("a blog can be deleted only by the user who added the blog", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const users = await helper.usersInDb()
    const token = jwt.sign(users[0], process.env.SECRET)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await helper.addUser("root", "secret")
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "testusername",
      name: "test name",
      password: "salainen"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "tesnme",
      password: "salinen"
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("`username` to be unique")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test("creation fails with proper statuscode and message if username is not given", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: "user without username",
      password: "ijsixapsoj"
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain(" `username` is required")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

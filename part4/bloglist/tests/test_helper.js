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

const nonExistingId = async () => {
  const blog = new Blog({
    title: "something new",
    author: "someone",
    url: "http://hkash.com",
    likes: 887
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
}

const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })

  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})

blogsRouter.post("/", async (req, res) => {
  const body = req.body

  console.log("req.token: ", req.token)
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" })
  }

  const user = await User.findById(decodedToken.id)

  if (user === undefined) {
    return res.status(400).json({ error: "user missing" })
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.json(savedBlog)
  }
})

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  const userid = await jwt.verify(req.token, process.env.SECRET)

  console.log("blog.user.toString(): ", blog.user.toString())
  console.log("user ID toString: ", userid)

  if (blog.user.toString() === userid.id) {
    await Blog.findByIdAndRemove(req.params.id)
    console.log(blog, "has been deleted")
    return res.status(204).end()
  } else {
    return res.status(404).end()
  }
})

blogsRouter.put("/:id", async (req, res, next) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

module.exports = blogsRouter

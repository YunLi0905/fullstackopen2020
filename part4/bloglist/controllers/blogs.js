const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (req, res) => {
  await Blog.find({}).then(blogs => {
    console.log(blogs)
    res.json(blogs)
  })
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

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  res.json(savedBlog)
})

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put("/:id", async (req, res) => {
  // const body = req.body

  // const blog = {
  //   title: body.title,
  //   author: body.author,
  //   url: body.url,
  //   likes: body.likes
  // }
  // console.log("blog: ", blog)

  // await Blog.findByIdAndUpdate(req.params.id, blog, { new: true }).then(
  //   updatedBlog => {
  //     console.log("updatedBlog: ", updatedBlog)
  //     res.json(updatedBlog.toJSON())
  //   }
  // )
  await Blog.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

module.exports = blogsRouter

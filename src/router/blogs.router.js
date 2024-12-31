const express =  require('express')
const router = express.Router()

const {getAllBlogs} = require('../controller/blogs.controller')

router.get('/', getAllBlogs)

module.exports = router


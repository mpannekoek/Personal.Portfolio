import { Router } from 'express';
import { getAllBlogs, getBlogBySlug } from '../lib/blog';

const router = Router();

router.get('/', (_req, res) => {
  try {
    const blogs = getAllBlogs()

    res.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
    })
  }
});

router.get('/:slug', (req, res) => {
  try {
    const { slug } = req.params
    const blog = getBlogBySlug(slug)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      })
    }

    return res.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
    })
  }
});

export default router;

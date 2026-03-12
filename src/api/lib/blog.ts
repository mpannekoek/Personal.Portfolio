import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_CONTENT_DIR = path.resolve(process.cwd(), 'content/blog');
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  published: boolean;
  image?: string;
}

export interface BlogWithContent extends BlogMeta {
  content: string;
}

function isBlogMeta(candidate: unknown): candidate is BlogMeta {
  if (typeof candidate !== 'object' || candidate === null) {
    return false;
  }

  const parsed = candidate as Record<string, unknown>;

  if (typeof parsed.slug !== 'string' || !SLUG_PATTERN.test(parsed.slug)) {
    return false;
  }

  if (typeof parsed.title !== 'string' || !parsed.title) {
    return false;
  }

  if (typeof parsed.date !== 'string' || Number.isNaN(Date.parse(parsed.date))) {
    return false;
  }

  if (typeof parsed.description !== 'string' || !parsed.description) {
    return false;
  }

  if (typeof parsed.author !== 'string' || !parsed.author) {
    return false;
  }

  if (!Array.isArray(parsed.tags) || parsed.tags.some((tag) => typeof tag !== 'string')) {
    return false;
  }

  if (typeof parsed.published !== 'boolean') {
    return false;
  }

  if (
    typeof parsed.image !== 'undefined' &&
    (typeof parsed.image !== 'string' || !parsed.image.trim())
  ) {
    return false;
  }

  return true;
}

function readBlogsFromDisk(): BlogWithContent[] {
  let filenames: string[] = [];

  try {
    filenames = fs
      .readdirSync(BLOG_CONTENT_DIR)
      .filter((filename) => filename.endsWith('.md'))
      .sort((left, right) => left.localeCompare(right));
  } catch (error) {
    console.warn(`Unable to read blog directory at "${BLOG_CONTENT_DIR}"`, error);
    return [];
  }

  const blogs: BlogWithContent[] = [];
  const seenSlugs = new Set<string>();

  for (const filename of filenames) {
    const fullPath = path.join(BLOG_CONTENT_DIR, filename);

    let fileContents = '';
    try {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
      console.warn(`Unable to read blog file "${fullPath}"`, error);
      continue;
    }

    let parsedFile;
    try {
      parsedFile = matter(fileContents);
    } catch (error) {
      console.warn(`Skipping "${filename}" because frontmatter is missing or malformed.`, error);
      continue;
    }

    if (!isBlogMeta(parsedFile.data)) {
      console.warn(`Skipping "${filename}" because required frontmatter is missing or invalid.`);
      continue;
    }

    if (seenSlugs.has(parsedFile.data.slug)) {
      console.warn(`Skipping "${filename}" because slug "${parsedFile.data.slug}" is duplicated.`);
      continue;
    }

    seenSlugs.add(parsedFile.data.slug);
    blogs.push({
      ...parsedFile.data,
      content: parsedFile.content.trim(),
    });
  }

  return blogs;
}

export function getAllBlogs(): BlogMeta[] {
  return readBlogsFromDisk()
    .filter((blog) => blog.published)
    .sort((left, right) => Date.parse(right.date) - Date.parse(left.date))
    .map(({ content, ...metadata }) => metadata);
}

export function getBlogBySlug(slug: string): BlogWithContent | null {
  return (
    readBlogsFromDisk().find((blog) => blog.published && blog.slug === slug) ?? null
  );
}

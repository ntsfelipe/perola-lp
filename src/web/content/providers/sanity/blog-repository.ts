import { SanityBlogRepository } from "@/content/providers/sanity/sanity-blog-repository";
import { sanityClient } from "@/sanity/lib/client";

export const blogRepository = new SanityBlogRepository(sanityClient);

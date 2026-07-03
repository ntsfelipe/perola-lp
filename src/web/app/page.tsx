import { LandingPage } from "@/components/landing/landing-page";
import { contentProvider } from "@/content/providers/static-content-provider";
import { blogRepository } from "@/content/providers/sanity/blog-repository";

export default async function HomePage() {
  const [content, posts] = await Promise.all([
    contentProvider.getLandingPage(),
    blogRepository.getLatestPosts(3),
  ]);

  return <LandingPage content={content} posts={posts} />;
}

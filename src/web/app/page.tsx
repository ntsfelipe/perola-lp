import { LandingPage } from "@/components/landing/landing-page";
import { contentProvider } from "@/content/providers/static-content-provider";

export default async function HomePage() {
  const content = await contentProvider.getLandingPage();

  return <LandingPage content={content} />;
}

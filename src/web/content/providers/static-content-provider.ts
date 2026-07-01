import { landingPageContent } from "@/content/landing-page";
import type { ContentProvider } from "@/content/providers/content-provider";
import type { LandingPageContent } from "@/types/content";

export class StaticContentProvider implements ContentProvider {
  async getLandingPage(): Promise<LandingPageContent> {
    return Promise.resolve(landingPageContent);
  }
}

export const contentProvider: ContentProvider = new StaticContentProvider();

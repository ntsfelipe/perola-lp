import type { LandingPageContent } from "@/types/content";

export interface ContentProvider {
  getLandingPage(): Promise<LandingPageContent>;
}

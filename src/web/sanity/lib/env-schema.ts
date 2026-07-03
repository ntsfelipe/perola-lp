export type SanityEnvironment = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  studioUrl: string;
};

export type EnvironmentInput = Partial<
  Record<
    | "NEXT_PUBLIC_SANITY_PROJECT_ID"
    | "NEXT_PUBLIC_SANITY_DATASET"
    | "NEXT_PUBLIC_SANITY_API_VERSION"
    | "NEXT_PUBLIC_SANITY_STUDIO_URL",
    string
  >
>;

const PROJECT_ID_PATTERN = /^[a-z0-9]+$/;
const DATASET_PATTERN = /^[a-z0-9_-]+$/;
const API_VERSION_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const STUDIO_PATH_PATTERN = /^\/(?!\/)[a-z0-9/_-]*$/;

export function parseSanityEnv(input: EnvironmentInput): SanityEnvironment {
  const projectId = input.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
  const dataset = input.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "";
  const apiVersion = input.NEXT_PUBLIC_SANITY_API_VERSION?.trim() ?? "";
  const studioUrl = input.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim() ?? "";

  const validApiDate =
    API_VERSION_PATTERN.test(apiVersion) && !Number.isNaN(Date.parse(apiVersion));

  if (
    !PROJECT_ID_PATTERN.test(projectId) ||
    !DATASET_PATTERN.test(dataset) ||
    !validApiDate ||
    !STUDIO_PATH_PATTERN.test(studioUrl)
  ) {
    throw new Error("Invalid Sanity configuration. Check the public environment variables.");
  }

  return { projectId, dataset, apiVersion, studioUrl };
}

/**
 * Replaceable SearchProvider adapter.
 * Never hard-code a single vendor.
 * If credentials missing → NOT_CONFIGURED (never fake results).
 */

export type ProviderStatus = "OK" | "NOT_CONFIGURED" | "ERROR";

export interface SearchResult {
  title: string;
  url: string;
  snippet?: string;
  publishedAt?: string;
  sourceName?: string;
  organization?: string;
  tenderNumber?: string;
  deadline?: string;
  estimatedValue?: number;
  location?: string;
}

export interface SearchProvider {
  name: string;
  status(): ProviderStatus;
  search(query: string, options?: { limit?: number }): Promise<SearchResult[]>;
}

class NotConfiguredProvider implements SearchProvider {
  name = "none";
  status(): ProviderStatus {
    return "NOT_CONFIGURED";
  }
  async search(): Promise<SearchResult[]> {
    return [];
  }
}

class BidAssistProvider implements SearchProvider {
  name = "bidassist";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  status(): ProviderStatus {
    return this.apiKey ? "OK" : "NOT_CONFIGURED";
  }

  async search(query: string, options?: { limit?: number }): Promise<SearchResult[]> {
    if (!this.apiKey) return [];
    // Placeholder — real integration requires commercial credentials
    // and must respect rate limits + ToS.
    console.info(`[BidAssist] search skipped (scaffold): ${query}`);
    return [];
  }
}

export function getSearchProvider(): SearchProvider {
  const key = process.env.SEARCH_API_KEY || "";
  const provider = process.env.SEARCH_PROVIDER || "none";

  if (provider === "bidassist" && key) {
    return new BidAssistProvider(key);
  }
  return new NotConfiguredProvider();
}

const localOrigins = [
  'http://localhost:3000',
  'http://localhost:3021',
  'http://localhost:4200',
];

const productionOrigins = [
  'https://metaenix.com',
  'https://api.metaenix.com',
  'https://db.metaenix.com',
  'https://ingest.metaenix.com',
  'https://play.metaenix.com',
  'https://src.metaenix.com',
  'https://dev.metaenix.com',
  // OTHERS
  'https://twitch.tv',
  'https://kick.com',
  'https://x.com',
];

// Function to check if an origin is allowed (handles wildcard subdomains)
const isAllowedOrigin = (origin: string | undefined, env: string): boolean => {
  if (!origin) return false;

  const allowedOrigins =
    env === 'production' ? productionOrigins : localOrigins;

  // Check exact match first (for known service subdomains)
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  // Check if it's ANY metaenix.com subdomain (wildcard support)
  // Matches: https://*.metaenix.com (including dev, username, etc.)
  // Pattern matches: https://subdomain.metaenix.com or https://metaenix.com
  const metaenixDomainPattern = /^https?:\/\/([a-zA-Z0-9-]+\.)?metaenix\.com$/;
  if (metaenixDomainPattern.test(origin)) {
    // Allow any subdomain of metaenix.com (dev, username, etc.)
    return true;
  }

  return false;
};

export const getCorsOrigins = (env: string): string[] => {
  return env === 'production' ? productionOrigins : localOrigins;
};

export const getCorsOriginFunction = (
  env: string,
): ((
  origin: string | undefined,
  callback: (err: Error | null, allow?: boolean) => void,
) => void) => {
  return (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    callback(null, isAllowedOrigin(origin, env));
  };
};

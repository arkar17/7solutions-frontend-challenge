import type { ApiUser } from './groupUsers';

interface UsersResponse { users: ApiUser[]; total: number }

/** dummyjson uses a default page size; limit=0 explicitly requests all users. */
export async function fetchUsers(fetcher: typeof fetch = fetch): Promise<ApiUser[]> {
  const response = await fetcher('https://dummyjson.com/users?limit=0', { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Upstream API returned ${response.status}`);
  const data: unknown = await response.json();
  if (!isUsersResponse(data)) throw new Error('Unexpected API response format');
  return data.users;
}

function isUsersResponse(data: unknown): data is UsersResponse {
  if (typeof data !== 'object' || data === null || !('users' in data) || !Array.isArray(data.users)) return false;
  return data.users.every((user: unknown) => {
    if (typeof user !== 'object' || user === null) return false;
    const u = user as Record<string, unknown>;
    const nested = (value: unknown, key: string): boolean => typeof value === 'object' && value !== null && typeof (value as Record<string, unknown>)[key] === 'string';
    return typeof u.firstName === 'string' && typeof u.lastName === 'string' && typeof u.age === 'number' && Number.isFinite(u.age) && typeof u.gender === 'string' && nested(u.hair, 'color') && nested(u.address, 'postalCode') && nested(u.company, 'department');
  });
}

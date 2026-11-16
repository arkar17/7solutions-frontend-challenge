import { describe, expect, it, vi } from 'vitest';
import { fetchUsers } from './fetchUsers';

describe('fetchUsers', () => {
  it('requests every user instead of the default first page', async () => {
    const mocked = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ users: [] }) });
    await fetchUsers(mocked as unknown as typeof fetch);
    expect(mocked.mock.calls[0][0]).toContain('limit=0');
  });
  it('rejects upstream errors', async () => {
    const mocked = vi.fn().mockResolvedValue({ ok: false, status: 503 });
    await expect(fetchUsers(mocked as unknown as typeof fetch)).rejects.toThrow('503');
  });
  it('rejects invalid JSON shape', async () => {
    const mocked = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ foo: [] }) });
    await expect(fetchUsers(mocked as unknown as typeof fetch)).rejects.toThrow('Unexpected');
  });
});

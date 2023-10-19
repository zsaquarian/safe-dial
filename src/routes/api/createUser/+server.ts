import { client } from '$lib/redis';
import type { User } from '$lib/types';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  let user: User;
  try {
    user = await request.json();
  } catch (e) {
    return json({ error: 'Invalid JSON' });
  }

  if (!user.number) {
    return json({ error: 'Provide number' });
  }

  if (!user.name) {
    return json({ error: 'Provide name' });
  }

  if ((await client.exists(`user-${user.name}`)) > 0) {
    return json({ error: 'User exists' });
  }

  await client.hSet(`user-${user.name}`, [...Object.entries(user)].flat());

  return json({ user });
};

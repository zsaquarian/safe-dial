import { client } from '$lib/redis';
import type { User } from '$lib/types';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  let formData;
  try {
    formData = await request.formData();
  } catch (e) {
    return json({ error: 'Invalid JSON' });
  }
  let number = formData.get('number');
  let name = formData.get('username');

  if (!number) {
    return json({ error: 'Provide number' });
  }

  if (!name) {
    return json({ error: 'Provide name' });
  }

  if ((await client.exists(`user-${name}`)) > 0) {
    return json({ error: 'User exists' });
  }

  await client.hSet(`user-${name}`, [...Object.entries({ number, name })].flat());

  throw redirect(303, '/');
};

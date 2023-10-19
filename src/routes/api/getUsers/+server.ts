import { client } from '$lib/redis';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const result = (await client.keys('user-*')).map((val) => val.match('user-(.*)')[1]);

  return json(result);
};

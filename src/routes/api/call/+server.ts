import { client } from '$lib/redis';
import type { User } from '$lib/types';
import { json, type RequestHandler } from '@sveltejs/kit';
import { TWILIO_CALLER_ID } from '$env/static/private';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

export const POST: RequestHandler = async ({ request, params }) => {
  // console.log(await request.formData());
  // const { username } = await request.json();
  const data = await request.formData();
  const username = data.get('username');
  console.log(username);

  const user: User = await client.hGetAll(`user-${username}`);

  const twiml = new VoiceResponse();
  const dial = twiml.dial({ callerId: TWILIO_CALLER_ID });
  if (!user.name) {
    twiml.say('Sorry, that user does not exist');
  } else {
    dial.number(user.number);
    console.log(twiml.toString());
  }

  return new Response(twiml.toString(), {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};

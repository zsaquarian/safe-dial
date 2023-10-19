import { v4 as uuidv4 } from 'uuid';
import AccessToken, { VoiceGrant } from 'twilio/lib/jwt/AccessToken';
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,
  TWIML_APP_SID
} from '$env/static/private';

export const genToken = () => {
  const identity = uuidv4();

  const accessToken = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, {
    identity
  });
  const grant = new VoiceGrant({
    outgoingApplicationSid: TWIML_APP_SID,
    incomingAllow: false
  });
  accessToken.addGrant(grant);

  return {
    identity: identity,
    token: accessToken.toJwt()
  };
};

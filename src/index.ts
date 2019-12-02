import axios from 'axios';
import cookie from 'cookie';
import lambda from 'aws-lambda';
import lodash from 'lodash';

import { Member, Leaderboard } from './types';

const formatMessage = (members: Member[], url: string) => {
  const lines = members.map(({ name, local_score, stars }) => {
    return `*${name}* ${local_score} Points, ${stars} Stars`;
  });

  const paragraphs = [lines.join('\n'), `<${url}|View online leaderboard>`];

  return paragraphs.join('\n\n');
};

export const handler: lambda.Handler = async () => {
  const { LEADERBOARD_ID, SESSION_ID, WEBHOOK_URI } = process.env;

  if (LEADERBOARD_ID == null) {
    throw new Error('Missing leaderboard ID');
  }

  if (SESSION_ID == null) {
    throw new Error('Missing session ID');
  }

  if (WEBHOOK_URI == null) {
    throw new Error('Missing webhook URI');
  }

  const year = new Date().getFullYear();
  const url = `https://adventofcode.com/${year}/leaderboard/private/view/${LEADERBOARD_ID}`;

  const response = await axios.get<Leaderboard>(url + '.json', {
    headers: { cookie: cookie.serialize('session', SESSION_ID) },
  });

  const members = lodash.sortBy(response.data.members, ['-local_score', '-stars']);
  const message = formatMessage(members, url);

  return axios.post(WEBHOOK_URI, {
    username: 'Advent of Code Leaderboard',
    icon_emoji: ':christmas_tree:',
    text: message,
  });
};

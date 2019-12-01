import '@babel/polyfill';

import lambda from 'aws-lambda';

export const handler: lambda.Handler = async (event, context) => {
  console.log({ event, context });
};

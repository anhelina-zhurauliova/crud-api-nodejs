import { User } from '../types/User';

export const parseReqBody = (request): Promise<User> =>
  new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (data) => {
      body += data;
    });

    request.on('end', () => {
      try {
        const parsedBody: User = JSON.parse(body);
        resolve(parsedBody);
      } catch (e) {
        reject('Format of data is not the JSON string');
      }
    });
  });

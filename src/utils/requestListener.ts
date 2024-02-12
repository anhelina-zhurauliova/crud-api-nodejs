import { RequestListener } from 'http';

import {
  getUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUser,
} from '../database';
import { StatusCode, Method } from '../types/Network';
import { parseReqBody } from '../utils/parseReqBody';
import { validateUser, validateUUID } from '../utils/validate';
import { User } from '../types/User';

export const requestListener: RequestListener = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  try {
    if (request.url === '/api/users') {
      switch (request.method) {
        case Method.GET:
          response.writeHead(StatusCode.OK);
          response.end(JSON.stringify({ users: getUsers() }));

          break;

        case Method.POST: {
          const newUser = await parseReqBody(request);
          await validateUser(newUser);

          const createdUser = addUser(newUser as User);

          response.writeHead(StatusCode.CREATED);
          response.end(JSON.stringify(createdUser));

          break;
        }

        default:
          response.writeHead(StatusCode.UNSUPPORTED_METHOD);
          response.end(JSON.stringify({ message: 'Method not allowed' }));
      }
    } else if (request.url.match(/\/api\/users\/([0-9aA-zZ]+)/)) {
      switch (request.method) {
        case Method.GET: {
          const id = request.url.split('/')[3];
          await validateUUID(id);

          const user = await getUserById(id);

          response.writeHead(StatusCode.OK);
          response.end(JSON.stringify(user));

          break;
        }

        case Method.PUT: {
          const id = request.url.split('/')[3];
          await validateUUID(id);

          const updatedInfo = await parseReqBody(request);
          await validateUser(updatedInfo);

          const updatedRecord = await updateUser(id, updatedInfo);

          response.writeHead(StatusCode.OK);
          response.end(JSON.stringify(updatedRecord));

          break;
        }

        case Method.DELETE: {
          const id = request.url.split('/')[3];
          await validateUUID(id);
          await deleteUser(id);

          response.writeHead(StatusCode.NO_CONTENT);
          response.end();

          break;
        }

        default:
          response.writeHead(StatusCode.UNSUPPORTED_METHOD);
          response.end(JSON.stringify({ message: 'Method not allowed' }));
      }
    } else {
      response.writeHead(StatusCode.NOT_FOUND);
      response.end(
        JSON.stringify({ message: 'Not found, try different endpoint' }),
      );
    }
  } catch (e) {
    response.writeHead(e.statusCode || StatusCode.INTERNAL_SERVER_ERROR);
    response.end(
      JSON.stringify({
        message: e.statusCode ? e.message : 'Error while processing your data',
      }),
    );
  }
};

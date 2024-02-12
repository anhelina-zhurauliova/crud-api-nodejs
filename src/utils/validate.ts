import { StatusCode } from '../types/Network';

export const validateUUID = async (id: string) => {
  return new Promise((resolve, reject) => {
    const isValid =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id,
      );

    isValid
      ? resolve(isValid)
      : reject({
          statusCode: StatusCode.BAD_REQUEST,
          message: 'Provided id is in the wrong format, uuid expected',
        });
  });
};

export const validateUser = async (user) => {
  return new Promise((resolve, reject) => {
    if (!user || !user.username || !user.hobbies || !user.age) {
      reject({
        statusCode: StatusCode.BAD_REQUEST,
        message: 'Not all required fields were provided',
      });
    } else if (typeof user.username !== 'string') {
      reject({
        statusCode: StatusCode.BAD_REQUEST,
        message: 'Username should be a string',
      });
    } else if (typeof user.age !== 'number') {
      reject({
        statusCode: StatusCode.BAD_REQUEST,
        message: "User's age should be a number",
      });
    } else if (!Array.isArray(user.hobbies)) {
      reject({
        statusCode: StatusCode.BAD_REQUEST,
        message: "User's hobbies should be an array",
      });
    } else if (user.hobbies.length > 0) {
      user.hobbies.filter((el) => typeof el === 'string').length !==
        user.hobbies.length &&
        reject({
          statusCode: StatusCode.BAD_REQUEST,
          message: "User's hobbies should be an array of strings",
        });
    }

    resolve(true);
  });
};

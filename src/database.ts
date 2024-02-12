import { v1 } from 'uuid';
import { User } from './types/User';
import { StatusCode } from './types/Network';

let users: User[] = [];

export const getUsers = () => users;

const findUser = (id: string) => {
  const userIndex = users.findIndex((el) => el.id === id);

  return userIndex > -1
    ? userIndex
    : {
        statusCode: StatusCode.NOT_FOUND,
        message: `User with id ${id} not found`,
      };
};

export const getUserById = async (id: string) =>
  new Promise((resolve, reject) => {
    const userIndex = findUser(id);

    typeof userIndex === 'number'
      ? resolve(users[userIndex])
      : reject(userIndex);
  });

export const addUser = ({ hobbies, age, username }: User) => {
  const newUser = { id: v1(), hobbies, age, username };
  users.push(newUser);

  return newUser;
};

export const deleteUser = async (id: string) =>
  new Promise((resolve, reject) => {
    const userIndex = findUser(id);
    const isFound = typeof userIndex === 'number';

    if (isFound) {
      users = users.filter((el) => el.id !== id);
      resolve(true);
    } else {
      reject(userIndex);
    }
  });

export const updateUser = async (
  id: string,
  { hobbies, username, age }: User,
) =>
  new Promise((resolve, reject) => {
    const userIndex = findUser(id);
    const isFound = typeof userIndex === 'number';

    if (isFound) {
      const updatedUser = { id, hobbies, username, age };

      users[userIndex] = updatedUser;
      resolve(updatedUser);
    } else {
      reject(userIndex);
    }
  });

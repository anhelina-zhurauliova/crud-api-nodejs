export enum StatusCode {
  NOT_FOUND = 404,
  OK = 200,
  UNSUPPORTED_METHOD = 405,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export const nullFieldError = {
  error: "Required field null",
  status: 500,
  statusText: "Email, name, and password must be non-null"
}

export const userNotFoundError = {
  error: "User Not Found",
  status: 404,
  statusText: "That user/password combination was not found."
}

export const userAlreadyExistsError = {
  error: "User Exists",
  status: 500,
  statusText: "That email address is already registered in our system."
}

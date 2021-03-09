const errorTypes = {
  dataBase: "dataBaseError",
};

const errorCodes = {
  NOT_YET_CREATED: 1,
  NOT_FOUND: 2,
  SOMETHING_WRONG: 3,
};

const createDataBaseError = (error, errorCode) => {
  if (typeof error !== "object") {
    return new DataBaseError(errorCode, error);
  }
  return error instanceof DataBaseError
    ? error
    : new DataBaseError(errorCode, error.message);
};

class DataBaseError extends Error {
  constructor(code, ...params) {
    super(...params);
    this.name = "DataBaseError";
    this.typeError = errorTypes.dataBase;
    this.code = code;
  }
}

exports.dataBaseError = {
  notFound: (error) => createDataBaseError(error, errorCodes.NOT_FOUND),
  notYetCreated: (error) =>
    createDataBaseError(error, errorCodes.NOT_YET_CREATED),
  somethingWrong: (error) =>
    createDataBaseError(error, errorCodes.SOMETHING_WRONG),
};

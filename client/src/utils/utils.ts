
function camelCaseToSpace(input: string) {
  return input.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function checkValues(values: any, errors: any, setErrors: any) {
  const newErrors = { ...errors };
  let hasError = false;
  Object.keys(values).forEach((key) => {
    if (!values[key] || values[key].trim() === "") {
      newErrors[key] = `${camelCaseToSpace(key)} is required`;
      hasError = true;
    } else {
      newErrors[key] = null;
    }
  });
  setErrors(newErrors);
  return hasError;
}

interface ErrorData {
  statusCode: number;
  message?: string | Array<string>;
  errors: string;
}

function manageError(errors: any, setErrors: any, data?: ErrorData) {
  // create newError object using keys of errors with all null value
  const newErrors = { ...errors };
  Object.keys(errors).forEach((key) => {
    newErrors[key] = null;
  });
  
  if (data && typeof data.message === "string") {
    const errorFor = data.message.split(" ")[0].toLowerCase();
    let foundErrorFor = false;
    Object.keys(errors).forEach((key) => {
      if (errorFor === key.toLowerCase()) {
        newErrors[key] = data.message;
        foundErrorFor = true;
      }
    });
    newErrors.general = foundErrorFor ? null : data.message.toString();
  } else if (data && Array.isArray(data.message)) {
    let foundErrorFor = false;
    data.message.forEach((error) => {
      const key = error.split(" ")[0].toLowerCase();
      if (key in newErrors) {
        foundErrorFor = true;
        newErrors[key] = newErrors[key] ? newErrors[key] + `\n${error}` : error;
      }
    });
    newErrors.general = foundErrorFor ? null : data.message.join("\n");
  } else {
    newErrors.general =
      data && Array.isArray(data.message)
        ? data.message.join("\n")
        : "Internal Server error";
  }
  setErrors(newErrors);
}

export { camelCaseToSpace, checkValues, manageError };

export function errorHandler(error: any, cause: string): string {
  let errorMessage = `Error: ${error.message}`;

  if (error.response) {
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
    const conflictError =
      error.response.data === 'Conflict'
        ? 'Error: The user already exists.'
        : null;
    errorMessage =
      conflictError || error.response.data.message || `Error during ${cause}${error.response.data ? ': ${error.response.data}' : '.'}.`;
  } else if (error.request) {
    console.error(error.request);
    errorMessage = 'No response from server. Please try again later.';
  }

  return errorMessage;
}

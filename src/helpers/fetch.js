// Helpers que nos ayuda a mandar el token al backend
const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchWithOutToken = (endpoint, data, method = "GET") => {
  // Esta funcion no lleva token
  const URL = `${BASE_URL}/${endpoint}`;

  if (method === "GET") {
    // Devuelve la funcion fetch
    return fetch(URL);
  } else {
    return fetch(URL, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

import { AUTH_URLS } from "../constants";

class API {
  constructor({ host = "" }) {
    this.baseUrl = host;
    this.headers = new Headers();
    this.setHeader("Accept", "application/json");
    this.setHeader("Content-Type", "application/json");
  }
  setHeader(name, value) {
    if (!value) return this.headers.delete(name);

    if (!this.headers.has(name)) return this.headers.append(name, value);

    return this.headers.set(name, value);
  }
  setToken(token = null) {
    if (token === null) this.setHeader("Authorization");
    else this.setHeader("Authorization", "Bearer " + token);

    return this;
  }

  login({ username, password }) {
    const DATA = {
      method: "POST",
      body: JSON.stringify({
        id: username,
        secret: password,
      }),
    };
    return this.fetch(AUTH_URLS.USERS_AUTHENTICATE, DATA);
  }

  fetch(url = "", { method = "get", body = null } = {}) {
    const requestData = {
      method,
      body,
      headers: this.headers,
    };
    const request = new Request(this.baseUrl + url, requestData);
    try {
      return fetch(request).then(response => {
        return response
          .json()
          .then(
            json =>
              response.ok ? Promise.resolve(json) : Promise.reject(json.error),
            error => Promise.reject(error.message)
          );
      });
    } catch (exception) {
      console.error(`Failed to retrieve informations: (${exception})`);
    }
  }
}

export default API;

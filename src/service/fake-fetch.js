import { AUTH_URLS } from "../constants/auth.const";

export default () => {
  //let realFetch = window.fetch;
  const payloadUser = {
    id: 1,
    email: "test@test.test",
    password: "test",
    firstName: "Test",
    lastName: "User"
  };

  window.fetch = (url, opts) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          url.endsWith(AUTH_URLS.USERS_AUTHENTICATE) &&
          opts.method === "POST"
        ) {
          let params = JSON.parse(opts.body);
          let user = { ...payloadUser };
          //let {...user} = payloadUser;
          if (user.password === params.password) {
            user.user_id = user.id;
            user.refreshToken = "fake-jwt-refreshToken";
            user.accessToken = "fake-jwt-accessToken";
            user.accessTokenExpDate =
              Math.floor(new Date().getTime() / 1000) + 86400;

            return resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(user))
            });
          } else {
            return reject(`Use '${user.password}' password`);
          }
        }
      }, 500);
    });
  };
};

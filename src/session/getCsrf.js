import axios from "axios";

const getCrsfToken = () => {
  const request = axios("/app/v1/auth", { withCredentials: true });
  request
    .then((result) => {
      return result.data.csrfToken;
    })
    .catch((err) => {
      return console.log(err)
    });
};

export default getCrsfToken;

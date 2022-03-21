import { ROUTES } from "@utils/routes";
import axios from "axios";
import Cookies from "js-cookie";
import { getSession } from "next-auth/react";
import Router from "next/router";

const http = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${session?.accessToken}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Change response data/error here
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === "VEDUSONE_ERROR.NOT_AUTHORIZED")
    ) {
      Cookies.remove("AUTH_CRED");
      Router.push(ROUTES.LOGIN);
    }
    return Promise.reject(error);
  }
);

export default http;

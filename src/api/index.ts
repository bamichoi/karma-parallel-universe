import axios from "axios";

interface RequestArgs {
  url: string;
  method: "get" | "post";
  data?: object;
  headers?: object;
}

const request = async ({ url, method, data, headers }: RequestArgs) => {
  const res = await axios({
    url,
    method,
    data,
    headers,
  });

  return res;
};

export default request;

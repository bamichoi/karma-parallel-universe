import request from ".";
import type { UniverseFormData } from "../types/form";

const API_URL =
  "https://0cez11yh0i.execute-api.eu-west-1.amazonaws.com/default/parallel-universe-proxy";

const requestSimulate = async (data: UniverseFormData) => {
  const res = await request({
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    method: "post",
    data,
  });

  return res.data.text;
};

export default requestSimulate;

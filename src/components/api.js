const API_BASE = import.meta.env.VITE_API_BASE || "https://rehomeit-ecommerce-website.onrender.com";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

export const apiGet = async (path) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: getHeaders(),
    credentials: "include",
  });
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return await res.json();
};

export const apiPost = async (path, body) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return await res.json();
};

export const apiDelete = async (path) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: getHeaders(),
    credentials: "include",
  });
  if (!res.ok) throw new Error(`DELETE ${path} failed`);
  return await res.json();
};

import { invoke } from "@tauri-apps/api/core";

declare global {
  interface Window {
    on_progress: any;
  }
}

export async function call(
  url: string,
  params?: any,
  on_progress_id?: string
): Promise<any> {
  return invoke("call", { url, params, progress: on_progress_id });
}

export async function get(key: string): Promise<string> {
  return invoke("get", { key });
}

export async function set(key: string, value: string): Promise<any> {
  value = value.trim();
  const env = JSON.parse(localStorage.getItem("env") || "{}");
  localStorage.setItem("env", JSON.stringify({ ...env, [key]: value }));
  return invoke("set", { key, value });
}

export const isTauri = true;

export async function loadEnvFromLocalStorage() {
  if (!isTauri) return;
  const env = JSON.parse(localStorage.getItem("env") || "{}");
  for (const key in env) await invoke("set", { key, value: env[key] });
}


export default call;

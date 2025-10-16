import axios, { AxiosError, type InternalAxiosRequestConfig, RequestConfig } from "axios";
import { getAccessToken, getRefreshToken, setAuthTokens, clearAuthTokens } from "./auth.utils";
import type { ApiResponse, TokenResponse } from "../types/request";

const axiosInstance = axios.create({
  baseURL: __H5_URL__,
  timeout: 30000,
});

const whiteList = ["/admin-api/system/auth/refresh-token", "/home/doctorLogin"];
function isAuthEndpoint(url?: string) {
  if (!url) return false;
  return whiteList.includes(url);
}

function shouldRefreshToken(error: AxiosError, config: InternalAxiosRequestConfig) {
  return (
    error.response?.status === 401 &&
    !isAuthEndpoint(config.url!) &&
    !(config as any)._retry &&
    getRefreshToken() !== null
  );
}
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];
async function handleTokenRefresh(error: AxiosError, originalRequest: InternalAxiosRequestConfig) {
  originalRequest._retry = true;

  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshSubscribers.push((newToken: string) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        resolve(axiosInstance(originalRequest));
      });
    });
  }

  isRefreshing = true;

  try {
    const newToken = await refreshAuthToken();
    onRefreshSuccess(newToken);

    // 重试原始请求
    originalRequest.headers.Authorization = `Bearer ${newToken}`;
    return axiosInstance(originalRequest);
  } catch (refreshError) {
    onRefreshFailure();
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
}

async function refreshAuthToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post<ApiResponse<TokenResponse>>(`http://${__ADMIN_URL__}/system/auth/refresh-token`, null, {
    params: { refreshToken }
  });

  if (response.data.success) {
    const { access_token, refresh_token } = response.data.data;
    setAuthTokens(access_token, refresh_token);
    return access_token;
  }

  throw new Error("Token refresh failed");
}

function onRefreshSuccess(newToken: string) {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
  refreshSubscribers.length = 0;
}

function onRefreshFailure() {
  clearAuthTokens();
  refreshSubscribers = [];
  refreshSubscribers.length = 0;
  // 跳转到登录页
  window.location.href = "/login";
}

// 请求拦截器：在每个请求发送前添加授权头（Authorization header）
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && !isAuthEndpoint(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：集中处理响应错误，例如令牌过期（401）
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (shouldRefreshToken(error, originalRequest)) {
      return handleTokenRefresh(error, originalRequest);
    }
    return Promise.reject(error);
  }
);

export function get<T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
  return axiosInstance.get(url, config);
}

export function post<T, D = unknown>(url: string, data?: D, config?: RequestConfig): Promise<ApiResponse<T>> {
  return axiosInstance.post(url, data, config);
}

export function put<T, D = unknown>(url: string, data?: D, config?: RequestConfig): Promise<ApiResponse<T>> {
  return axiosInstance.put(url, data, config);
}

export function del<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
  return axiosInstance.delete(url, config);
}

export function patch<T, D = unknown>(url: string, data?: D, config?: RequestConfig): Promise<ApiResponse<T>> {
  return axiosInstance.patch(url, data, config);
}

export default axiosInstance;

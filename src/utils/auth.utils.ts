// 令牌的存储键名
const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * 将访问令牌和刷新令牌保存到 localStorage
 * @param {string} accessToken - 访问令牌
 * @param {string} refreshToken - 刷新令牌
 */
export const setAuthTokens = (accessToken: string, refreshToken?: string) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

/**
 * 获取存储的访问令牌
 * @returns {string | null} 返回访问令牌，如果不存在则返回 null
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * 获取存储的刷新令牌
 * @returns {string | null} 返回刷新令牌，如果不存在则返回 null
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * 清除所有认证信息
 */
export const clearAuthTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * 检查用户是否已认证
 * @returns {boolean}
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};
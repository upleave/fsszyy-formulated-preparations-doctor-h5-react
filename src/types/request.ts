// types/request.ts
import type { AxiosRequestConfig } from 'axios'

export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
  success: boolean
}

export interface TokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  retryOnTokenExpire?: boolean
}
import type { IDoctorAuthInfo, IDoctorInfo, ILoginReq } from '~/types/doctor-auth'

import { useQuery } from "@tanstack/react-query";


// export const AuthApi = {
//   // 登录接口
//   login: (data: ILoginReq, options?: IRequestHttpOptions) => {
//     return requestDoctorApi<IDoctorAuthInfo>('/home/doctorLogin', {
//       method: 'POST',
//       body: data,
//       ...options,
//     })
//   },
//   // 获取医生信息
//   getDoctorInfo: (id: number, options?: IRequestHttpOptions) => {
//     return requestDoctorApi<IDoctorInfo>('/doctor/prescriptionRenewalApplicationController/loginDoctorInfo', {
//       params: {
//         id,
//       },
//       ...options,
//     })
//   },

//   refreshToken: (rToken: string, options?: IRequestHttpOptions) => {
//     const { API_HOST, API_PORT, API_ADMIN_PATH } = useRuntimeConfig().public
//     return requestDoctorApi<IDoctorAuthInfo>('/system/auth/refresh-token', {
//       baseURL: `http://${API_HOST}:${API_PORT}${API_ADMIN_PATH}`,
//       method: 'POST',
//       params: { refreshToken: rToken },
//       ...options,
//     })
//   },
// }

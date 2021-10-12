import jwt_decode from "jwt-decode";

export const parseAccessToken = ()=>{
  return jwt_decode(localStorage.getItem('accessToken'), { payload: true });
}
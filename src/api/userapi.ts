import request from "./requestconfig";

export class HttpService {
    public postLoginUser(params = {}){
        return request({
            url:'/user/login',
            method:'post',
            data: params
        })
    }
    public postRegisterUser(params = {}){
        return request({
            url:'/auth/register',
            method:'post',
            data: params
        })
    }
}
 
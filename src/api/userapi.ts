import Service from "./requestconfig";

type Common<T> = {
    code: number
    data: T
    msg: string
}
export type CategoryItem = {
    id: number
    name: string
    content: string
    image_urls: string
}
export type AuthApplyItem = {
    ID: number
    state: number
    community: string
    room: string
    user_id: string
    telephone: string
    img_url: string
    CreatedAt: string
}
export type CommunityItem = {
    ID: number
    state: number
    name: string
    detail_name: string
    address: string
    img_url: string
    latitude: number
    longitude: number
}
export type ArticleItem = {
    id: number
    title: string
    content: string
    img: string
    isActive: boolean
}

// export const geAllCategorys = (params = {}) => {
//     return Service<Common<CategoryItem[]>>({
//         url:'/category/getn',
//         method:'post',
//         data: params
//     })
// }
export class HttpService {

    // ------------------------------分类和文章API

    // 删除文章
    public postDetArticle(params = {}) {
        return Service({
            url: process.env.VUE_APP_ARTICLE_DET,
            method: 'post',
            data: params
        })
    }
    // 新增文章
    public postAddArticle(params = {}) {
        return Service({
            url: process.env.VUE_APP_ARTICLE_ADD,
            method: 'post',
            data: params
        })
    }
    // 获取分类下所有文章
    public getCateArticles = (params = {}) => {
        return Service<Common<ArticleItem[]>>({
            url: process.env.VUE_APP_ARTICLE_CATELIST,
            method: 'post',
            data: params
        })
    }
    // 获取所有文章
    public getAllArticles = (params = {}) => {
        return Service<Common<ArticleItem[]>>({
            url: process.env.VUE_APP_ARTICLE_ARTLIST,
            method: 'post',
            data: params
        })
    }
    // 获取分类详情
    public getCategoryDetail(params = {}) {
        return Service({
            url: process.env.VUE_APP_CATE_DETAIL,
            method: 'post',
            data: params
        })
    }
    // 删除分类
    public postDetCategory(params = {}) {
        return Service({
            url: process.env.VUE_APP_CATE_DET,
            method: 'post',
            data: params
        })
    }
    // 新增分类
    public postAddCategory(params = {}) {
        return Service({
            url: process.env.VUE_APP_CATE_ADD,
            method: 'post',
            data: params
        })
    }
    // 删除七牛云图片
    public postDeleteQinNiuFile = (params = {}) => {
        return Service({
            url: process.env.VUE_APP_QINIU_REMOVE_FILE,
            method: 'post',
            data: params
        })
    }
    // 获取七牛云上传token
    public getQinNiuUpToken = (params = {}) => {
        return Service({
            url: process.env.VUE_APP_QINIU_TOKEN,
            method: 'get',
            data: params
        })
    }
    // 获取所有分类
    public geAllCategorys = (params = {}) => {
        return Service<Common<CategoryItem[]>>({
            url: process.env.VUE_APP_CATE_GET,
            method: 'post',
            data: params
        })
    }

    // ------------------------------业主认证API
    // 获取所有申请
    public geAllAuthApplys = (params = {}) => {
        return Service<Common<AuthApplyItem[]>>({
            url: process.env.VUE_APP_APPLYLIST_GET,
            method: 'post',
            data: params
        })
    }
    // 审核操作
    public checkAuthApplys = (params = {}) => {
        return Service<Common<AuthApplyItem[]>>({
            url: process.env.VUE_APP_APPLYLIST_CHECK,
            method: 'post',
            data: params
        })
    }
    // 删除审核操作
    public deleteAuthApplys = (params = {}) => {
        return Service<Common<AuthApplyItem[]>>({
            url: process.env.VUE_APP_APPLYLIST_DET,
            method: 'post',
            data: params
        })
    }
    // ------------------------------社区API
    // 新增Community
    public addCommunity = (params = {}) => {
        return Service<Common<CommunityItem[]>>({
            url: process.env.VUE_APP_COMMUNITY_ADD,
            method: 'post',
            data: params
        })
    }
    // 获取所有Community
    public geAllCommunity = (params = {}) => {
        return Service<Common<CommunityItem[]>>({
            url: process.env.VUE_APP_COMMUNITY_GET,
            method: 'post',
            data: params
        })
    }
    // Community操作
    public checkCommunity = (params = {}) => {
        return Service<Common<CommunityItem[]>>({
            url: process.env.VUE_APP_COMMUNITY_CHECK,
            method: 'post',
            data: params
        })
    }
    // 删除Community
    public deleteCommunity = (params = {}) => {
        return Service<Common<CommunityItem[]>>({
            url: process.env.VUE_APP_COMMUNITY_DET,
            method: 'post',
            data: params
        })
    }

    // ------------------------------用户模块API

    // 用户登录
    public postUserLogin(params = {}) {

        return Service({
            url: process.env.VUE_APP_USER_LOGIN,
            method: 'post',
            data: params
        })
    }
    // 用户注册
    public postUserRegister(params = {}) {
        return Service({
            url: process.env.VUE_APP_USER_REGISTER,
            method: 'post',
            data: params
        })
    }
    // 获取用户详情
    public getUserInfo(params = {}) {
        return Service({
            url: process.env.VUE_APP_USER_INFO,
            method: 'get',
            data: params
        })
    }
    // 用户退出登录
    public postUserLogout(params = {}) {
        return Service({
            url: process.env.VUE_APP_USER_LOGOUT,
            method: 'post',
            data: params
        })
    }
}

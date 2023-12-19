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
export type TywUsergoryItem = {
    id: number
    username: string
    avater: string
    telephone: string
    state: number
    default_community: string
    default_room: string
    password: string

}
export type ConfigItem = {
    CreatedAt: string
    ID: number
    state: string
    name: string
    title: string
}
export type ShopItem = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    in_maintenance: boolean;
    negotiable: boolean;
    state: number;
    posts_type: number;
    user_id: string;
    telephone: string;
    wei_xin: string;
    title: string;
    img_url: string;
    annual_rent: string;
    address: string;
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
    public geAllCommunitys = (params = {}) => {
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
    public deleteCommunitys = (params = {}) => {
        return Service<Common<CommunityItem[]>>({
            url: process.env.VUE_APP_COMMUNITY_DET,
            method: 'post',
            data: params
        })
    }

    // ------------------------------字典配置API
    // 新增字典配置
    public addConfig = (params = {}) => {
        return Service<Common<ConfigItem[]>>({
            url: process.env.VUE_APP_CONFIG_ADD,
            method: 'post',
            data: params
        })
    }
    // 获取所有字典配置
    public geAllConfig = (params = {}) => {
        return Service<Common<ConfigItem[]>>({
            url: process.env.VUE_APP_CONFIG_GET,
            method: 'post',
            data: params
        })
    }
    // 字典配置操作
    public checkConfig = (params = {}) => {
        return Service<Common<ConfigItem[]>>({
            url: process.env.VUE_APP_CONFIG_CHECK,
            method: 'post',
            data: params
        })
    }
    // 删除字典配置
    public deleteConfig = (params = {}) => {
        return Service<Common<ConfigItem[]>>({
            url: process.env.VUE_APP_CONFIG_DET,
            method: 'post',
            data: params
        })
    }

    // ------------------------------商店配置API
    //商店配置
    public addShop = (params = {}) => {
        return Service<Common<ShopItem[]>>({
            url: process.env.VUE_APP_SHOP_ADD,
            method: 'post',
            data: params
        })
    }
    // 获取所有商店
    public geAllShop = (params = {}) => {
        return Service<Common<ShopItem[]>>({
            url: process.env.VUE_APP_SHOP_GET,
            method: 'post',
            data: params
        })
    }

    // 商家配置操作
    public checkShop = (params = {}) => {
        return Service<Common<ShopItem[]>>({
            url: process.env.VUE_APP_SHOP_CHECK,
            method: 'post',
            data: params
        })
    }
    // 删除商店
    public deleteShop = (params = {}) => {
        return Service<Common<ShopItem[]>>({
            url: process.env.VUE_APP_SHOP_DET,
            method: 'post',
            data: params
        })
    }

// ------------------------------天悦湾小程序用户管理API
   
    // 获取小程序用户详情
    // public getTywUsergoryDetail = (params = {}) => {
    //     return Service<Common<CommunityItem[]>>({
    //         url: process.env.VUE_APP_TYWUSER_GET,
    //         method: 'post',
    //         data: params
    //     })
    // }
    // 获取所有小程序用户
    public geAllTywUser = (params = {}) => {
        return Service<Common<CommunityItem[]>>({
            url: process.env.VUE_APP_TYWUSER_GET,
            method: 'post',
            data: params
        })
    }
    // 删除小程序用户
    public deleteTywUser = (params = {}) => {
        return Service<Common<CommunityItem[]>>({
            url: process.env.VUE_APP_TYWUSER_DET,
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

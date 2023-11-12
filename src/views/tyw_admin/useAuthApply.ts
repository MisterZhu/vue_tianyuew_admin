import { ElMessageBox } from "element-plus"
import type { AuthApplyItem, ArticleItem } from "@/api/userapi";


export function useAuthApply() {

    const server = inject('server')

    const allAuthApplys = ref([] as AuthApplyItem[])
    const allArticle = ref([] as ArticleItem[])

    const AuthApplyItem = ref<AuthApplyItem>();
    const articleItem = ref<ArticleItem>();

    var AuthApplyid = ""
    //获取分类下的所有文章
    const getAuthApplyAllArticles = async (id: string) => {
        AuthApplyid = id
        // @ts-ignore
        const res = await server.userApi.getAuthApplyArticles({ "id": id })
        if (res.code === 200) {
            allArticle.value = res.data
        } else {
            ElMessage.error('获取视频列表失败')
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }
    //获取分类详情
    const getAuthApplyDetail = async (id: string) => {
        // @ts-ignore
        const res = await server.userApi.getAuthApplygoryDetail({ "id": id })
        if (res.code === 200) {
            AuthApplyItem.value = res.data
        } else {
            ElMessage.error(res.msg)
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }
    //获取所有申请
    const getAllAuthApply = async () => {
        // @ts-ignore
        const res = await server.userApi.geAllAuthApplys()
        if (res.code === 200) {
            allAuthApplys.value = res.data
            for (const authApply of allAuthApplys.value) {
                console.log("Auth Apply Item Details:");
                console.log("ID:", authApply.id);
                console.log("State:", authApply.state);
                console.log("Community:", authApply.community);
                console.log("Room:", authApply.room);
                console.log("User ID:", authApply.user_id);
                console.log("Telephone:", authApply.telephone);
                console.log("Image URL:", authApply.img_url);
                console.log("Created At:", authApply.created_at);
                console.log("--------------------------");
              }
              
        } else {
            ElMessage.error('获取主播列表失败')
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }

    //删除分类事件处理
    const deleteAuthApply = async (id: number) => {

        // 1.弹框询问
        await ElMessageBox.confirm("确定要删除该课程吗？", "删除提醒", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: 'warning'
        }).catch(() => {
            ElMessage.info("删除操作取消")
            return new Promise(() => { })
        })
        // 2.执行删除
        // @ts-ignore
        const res = await server.userApi.postDetAuthApplygory({ "id": id })
        if (res.code === 200) {
            ElMessage.success("删除成功")
            getAllAuthApply()
        } else {
            ElMessage.error('删除失败')
            throw new Error(res.msg || '网络异常')
        }
    }
    //删除文章事件处理
    const deleteArticle = async (id: number) => {

        // 1.弹框询问
        await ElMessageBox.confirm("确定要删除该视频吗？", "删除提醒", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: 'warning'
        }).catch(() => {
            ElMessage.info("删除操作取消")
            return new Promise(() => { })
        })
        // 2.执行删除
        // @ts-ignore
        const res = await server.userApi.postDetArticle({ "id": id })
        if (res.code === 200) {
            ElMessage.success("删除成功")
            getAuthApplyAllArticles(AuthApplyid)
        } else {
            ElMessage.error('删除失败')
            throw new Error(res.msg || '网络异常')
        }
    }

    return { getAllAuthApply, allAuthApplys, deleteAuthApply, getAuthApplyDetail, AuthApplyItem, getAuthApplyAllArticles, allArticle, deleteArticle }
}
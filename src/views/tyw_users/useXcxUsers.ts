import { ElMessageBox } from "element-plus"
import type { TywUsergoryItem, ArticleItem } from "@/api/userapi";


export function useXcxUsers() {

    const server = inject('server')

    const allTywUsers = ref([] as TywUsergoryItem[])
    const allArticle = ref([] as ArticleItem[])

    const TywUserItem = ref<TywUsergoryItem>();
    const articleItem = ref<ArticleItem>();

    var TywUserid = ""
   
    //获取天悦湾用户详情
    const getTywUserDetail = async (id: string) => {
        // @ts-ignore
        const res = await server.userApi.getTywUsergoryDetail({ "id": parseInt(id, 10) })
        if (res.code === 200) {
            TywUserItem.value = res.data
        } else {
            ElMessage.error(res.msg)
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }
    //获取所有天悦湾用户
    const getAllTywUser = async () => {
        // @ts-ignore
        const res = await server.userApi.geAllTywUser()
        if (res.code === 200) {
            allTywUsers.value = res.data
        } else {
            ElMessage.error('获取主播列表失败')
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }

    //删除天悦湾用户
    const deleteTywUser = async (id: number) => {

        // 1.弹框询问
        await ElMessageBox.confirm("确定要删除该用户吗？", "删除提醒", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: 'warning'
        }).catch(() => {
            ElMessage.info("删除操作取消")
            return new Promise(() => { })
        })
        // 2.执行删除
        // @ts-ignore
        const res = await server.userApi.postDetTywUser({ "id": id })
        if (res.code === 200) {
            ElMessage.success("删除成功")
            getAllTywUser()
        } else {
            ElMessage.error('删除失败')
            throw new Error(res.msg || '网络异常')
        }
    }
    

    return { getAllTywUser, allTywUsers, deleteTywUser, getTywUserDetail, TywUserItem, allArticle }
}
import { ElMessageBox } from "element-plus"
import type { CategoryItem, ArticleItem } from "@/api/userapi";


export function useXcxFeedback() {

    const server = inject('server')

    const allCates = ref([] as CategoryItem[])
    const allArticle = ref([] as ArticleItem[])

    const cateItem = ref<CategoryItem>();
    const articleItem = ref<ArticleItem>();

    var cateid = ""
    //获取分类下的所有文章
    const getCateAllArticles = async (id: string) => {
        cateid = id
        // @ts-ignore
        const res = await server.userApi.getCateArticles({ "id": id })
        if (res.code === 200) {
            allArticle.value = res.data
        } else {
            ElMessage.error('获取视频列表失败')
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }
    //获取分类详情
    const getCateDetail = async (id: string) => {
        // @ts-ignore
        const res = await server.userApi.getCategoryDetail({ "id": id })
        if (res.code === 200) {
            cateItem.value = res.data
        } else {
            ElMessage.error(res.msg)
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }
    //获取所有分类
    const getAllCate = async () => {
        // @ts-ignore
        const res = await server.userApi.geAllCategorys()
        if (res.code === 200) {
            allCates.value = res.data
        } else {
            ElMessage.error('获取主播列表失败')
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }

    //删除分类事件处理
    const deleteCate = async (id: number) => {

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
        const res = await server.userApi.postDetCategory({ "id": id })
        if (res.code === 200) {
            ElMessage.success("删除成功")
            getAllCate()
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
            getCateAllArticles(cateid)
        } else {
            ElMessage.error('删除失败')
            throw new Error(res.msg || '网络异常')
        }
    }

    return { getAllCate, allCates, deleteCate, getCateDetail, cateItem, getCateAllArticles, allArticle, deleteArticle }
}
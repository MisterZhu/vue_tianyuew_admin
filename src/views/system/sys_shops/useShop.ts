import { ElMessageBox } from "element-plus"
import type { ShopItem } from "@/api/userapi";


export function useShop() {

    const server = inject('server')

    const allShops = ref([] as ShopItem[])

    const ShopItem = ref<ShopItem>();

    var Shopid = ""
    const size = 100
    let page = 0
    //获取所有
    const getAllShop = async () => {
        // @ts-ignore
        const res = await server.userApi.geAllShop({ "page": page, "size": size })
        if (res.code === 200) {
            allShops.value = res.data

        } else {
            ElMessage.error('获取申请列表失败')
            throw new Error(res.msg || '网络异常')
        }
    }
    //修改配置数据
    const ShopApprove = async (id: number, state: string) => {

        const formData = {
            id: id,
            state: state
        }
        console.log("-------------ID:", id);

        // @ts-ignore
        const res = await server.userApi.checkShop(formData)
        if (res.code === 200) {
            ElMessage.success("审核成功")
            getAllShop()
        } else {
            ElMessage.error('审核失败')
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }
  
    //删除
    const deleteShops = async (id: number) => {

        // // 1.弹框询问
        // await ElMessageBox.confirm("确定要删除该视频吗？", "删除提醒", {
        //     confirmButtonText: "确认",
        //     cancelButtonText: "取消",
        //     type: 'warning'  
        // }).catch(() => {
        //     ElMessage.info("删除操作取消")
        //     return new Promise(() => { })
        // })

        // 2.执行删除
        // @ts-ignore
        const res = await server.userApi.deleteShop({ "id": id })
        if (res.code === 200) {
            ElMessage.success("删除成功")
            getAllShop()
        } else {
            ElMessage.error('删除失败')
            throw new Error(res.msg || '网络异常')
        }
    }

    return { getAllShop, allShops, ShopApprove, ShopItem, deleteShops }
}
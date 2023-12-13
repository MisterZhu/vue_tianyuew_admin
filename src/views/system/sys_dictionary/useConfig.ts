import { ElMessageBox } from "element-plus"
import type { ConfigItem } from "@/api/userapi";


export function useConfig() {

    const server = inject('server')

    const allConfigs = ref([] as ConfigItem[])

    const ConfigItem = ref<ConfigItem>();

    var Configid = ""
    const size = 100
    let page = 0
    //获取所有
    const getAllConfig = async () => {
        // @ts-ignore
        const res = await server.userApi.geAllConfigs({ "page": page, "size": size })
        if (res.code === 200) {
            allConfigs.value = res.data

        } else {
            ElMessage.error('获取申请列表失败')
            throw new Error(res.msg || '网络异常')
        }
    }
    //修改配置数据
    const ConfigApprove = async (id: number) => {
        const formData = {
            id: id,
            state: 1
        }
        console.log("-------------ID:", id);

        // @ts-ignore
        const res = await server.userApi.checkConfigs(formData)
        if (res.code === 200) {
            ElMessage.success("审核成功")
            getAllConfig()
        } else {
            ElMessage.error('审核失败')
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }
  
    //删除
    const deleteConfigs = async (id: number) => {

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
        const res = await server.userApi.deleteConfigs({ "id": id })
        if (res.code === 200) {
            ElMessage.success("删除成功")
            getAllConfig()
        } else {
            ElMessage.error('删除失败')
            throw new Error(res.msg || '网络异常')
        }
    }

    return { getAllConfig, allConfigs, ConfigApprove, ConfigItem, deleteConfigs }
}
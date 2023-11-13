import { ElMessageBox } from "element-plus"
import type { AuthApplyItem, ArticleItem } from "@/api/userapi";


export function useAuthApply() {

    const server = inject('server')

    const allAuthApplys = ref([] as AuthApplyItem[])

    const AuthApplyItem = ref<AuthApplyItem>();

    var AuthApplyid = ""
    //获取所有申请
    const getAllAuthApply = async () => {
        // @ts-ignore
        const res = await server.userApi.geAllAuthApplys()
        if (res.code === 200) {
            allAuthApplys.value = res.data
            // for (const authApply of allAuthApplys.value) {
            //     console.log("Auth Apply Item Details:");
            //     console.log("ID:", authApply.ID);
            //     console.log("State:", authApply.state);
            //     console.log("Community:", authApply.community);
            //     console.log("Room:", authApply.room);
            //     console.log("User ID:", authApply.user_id);
            //     console.log("Telephone:", authApply.telephone);
            //     console.log("Image URL:", authApply.img_url);
            //     console.log("Created At:", authApply.CreatedAt);
            //     console.log("--------------------------");
            // }

        } else {
            ElMessage.error('获取申请列表失败')
            throw new Error(res.msg || '网络异常')
        }
    }
    //审核通过
    const authApplyApprove = async (id: number) => {
        const formData = {
            id: id,
            state: 1
        }
        console.log("-------------ID:", id);

        // @ts-ignore
        const res = await server.userApi.checkAuthApplys(formData)
        if (res.code === 200) {
            ElMessage.success("审核成功")
            getAllAuthApply()
        } else {
            ElMessage.error('审核失败')
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }
    //审核拒绝
    const authApplyReject = async (id: number) => {
        const formData = {
            'id': id,
            'state': 2
        }
        // @ts-ignore
        const res = await server.userApi.checkAuthApplys(formData)
        if (res.code === 200) {
            ElMessage.success("操作成功")
            getAllAuthApply()
        } else {
            ElMessage.error('操作失败')
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }
    //删除
    const deleteAuthApply = async (id: number) => {

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
        const res = await server.userApi.deleteAuthApplys({ "id": id })
        if (res.code === 200) {
            ElMessage.success("删除成功")
            getAllAuthApply()
        } else {
            ElMessage.error('删除失败')
            throw new Error(res.msg || '网络异常')
        }
    }

    return { getAllAuthApply, allAuthApplys, authApplyApprove, authApplyReject, AuthApplyItem, deleteAuthApply }
}
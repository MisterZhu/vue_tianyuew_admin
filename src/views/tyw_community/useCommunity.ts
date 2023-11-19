import { ElMessageBox } from "element-plus"
import type { CommunityItem } from "@/api/userapi";


export function useCommunity() {

    const server = inject('server')

    const allCommunitys = ref([] as CommunityItem[])

    const CommunityItem = ref<CommunityItem>();

    var Communityid = ""
    //获取所有申请
    const getAllCommunity = async () => {
        // @ts-ignore
        const res = await server.userApi.geAllCommunitys()
        if (res.code === 200) {
            allCommunitys.value = res.data
            // for (const Community of allCommunitys.value) {
            //     console.log("Auth Apply Item Details:");
            //     console.log("ID:", Community.ID);
            //     console.log("State:", Community.state);
            //     console.log("Community:", Community.community);
            //     console.log("Room:", Community.room);
            //     console.log("User ID:", Community.user_id);
            //     console.log("Telephone:", Community.telephone);
            //     console.log("Image URL:", Community.img_url);
            //     console.log("Created At:", Community.CreatedAt);
            //     console.log("--------------------------");
            // }

        } else {
            ElMessage.error('获取申请列表失败')
            throw new Error(res.msg || '网络异常')
        }
    }
    //审核通过
    const CommunityApprove = async (id: number) => {
        const formData = {
            id: id,
            state: 1
        }
        console.log("-------------ID:", id);

        // @ts-ignore
        const res = await server.userApi.checkCommunitys(formData)
        if (res.code === 200) {
            ElMessage.success("审核成功")
            getAllCommunity()
        } else {
            ElMessage.error('审核失败')
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }
    //审核拒绝
    const CommunityReject = async (id: number) => {
        const formData = {
            'id': id,
            'state': 2
        }
        // @ts-ignore
        const res = await server.userApi.checkCommunitys(formData)
        if (res.code === 200) {
            ElMessage.success("操作成功")
            getAllCommunity()
        } else {
            ElMessage.error('操作失败')
            throw new Error(res.msg || '网络异常')
        }
        // console.log(res)
    }
    //删除
    const deleteCommunitys = async (id: number) => {

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
        const res = await server.userApi.deleteCommunitys({ "id": id })
        if (res.code === 200) {
            ElMessage.success("删除成功")
            getAllCommunity()
        } else {
            ElMessage.error('删除失败')
            throw new Error(res.msg || '网络异常')
        }
    }

    return { getAllCommunity, allCommunitys, CommunityApprove, CommunityReject, CommunityItem, deleteCommunitys }
}
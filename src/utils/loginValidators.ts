
import { ref } from 'vue';

interface User {
    email: string;
    password: string;
}
export const loginUser = ref ({
    email: "",
    password: "",
});

interface Rules {
    email: {
        type: string;
        message: string;
        required: boolean;
        trigger: string;
    }[];
    password: ({
        required: boolean;
        message: string;
        trigger: string;
        min?: undefined;
        max?: undefined;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
        required?: undefined;
    })[];
}

export const rules = ref({
    email: [
        {
            type: "email",
            message: "邮箱格式不对",
            required: true,
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
        },
        {
            min: 6,
            max: 30,
            message: "密码长度限制在6-30个字符",
            trigger: "blur",
        },
    ],
});
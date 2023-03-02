
import { ref } from 'vue';

interface User {
    telephone: string;
    password: string;
}
export const loginUser = ref ({
    telephone: "",
    password: "",
});

interface Rules {
    telephone: {
        // type: string;
        pattern: RegExp;
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
    telephone: [
        {
            // type: "email",
            pattern: /^[1]([3-9])[0-9]{9}$/,
            message: "请正确输入11位手机号码",
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
import authAPI from "../../../apis/authUrl.ts";
import { getCookie, setCookie } from '../../cookie/cookie.ts';
import type LoginModel from "../../model/auth/AuthModel.ts";
import type ApiResponse from "../../mapping/BaseResponse.ts";
import type LoginResponse from "../../mapping/Auth.ts";


export const userLoginHandler = async (params: LoginModel) => {
    try {
        const response = await fetch(authAPI.authAPI().user_login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        const data = (await response.json()) as ApiResponse<LoginResponse>;

        if (data && data.data?.token) {
            setCookie("userToken", data.data?.token);
        }

        return {
            message: data.message as string || '',
            data: data.data as LoginResponse || null,
            statusCode: data.code as number
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
        };
    }
};

export const updateSettingHandler = async (params: any) => {
    try {
        const response = await fetch(authAPI.authAPI().maintainence, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('userToken')}`,
            },
            body: JSON.stringify(params),
        });

        const data = (await response.json()) as ApiResponse;

        return {
            message: data.message as string || '',
            data: data.data as any || null,
            statusCode: data.code as number
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
        };
    }
}

export const retriveSettingHandler = async() => {
    try {
        const response = await fetch(authAPI.authAPI().maintainence, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('userToken')}`,
            },
        });

        const data = (await response.json()) as ApiResponse;

        return {
            message: data.message as string || '',
            data: data.data as any || null,
            statusCode: data.code as number
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
        };
    }
};
import bannerAPI from "../../../apis/bannerUrl.ts";
import type Banner from "../../model/banner/BannerModel.ts";
import type ApiResponse from "../../mapping/BaseResponse.ts";
import { getCookie } from "../../cookie/cookie.ts";

export const createBannerHandler = async (params: Banner) => {
    try {
        const response = await fetch(bannerAPI.bannerAPI().create_banner, {
            method: "POST",
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
};

export const retriveBannerHandler = async () => {
    try {
        const response = await fetch(bannerAPI.bannerAPI().retrive_banner, {
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
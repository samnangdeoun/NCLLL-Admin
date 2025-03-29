import partnerAPI from "../../../apis/partnerUrl.ts";
import type PartnerModel from "../../model/partner/PartnerModel.ts";
import type ApiResponse from "../../mapping/BaseResponse.ts";
import { getCookie } from "../../cookie/cookie.ts";

export const createPartnerHandler = async (params: PartnerModel) => {
    try {
        const response = await fetch(partnerAPI.partnerAPI().create_partner, {
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

export const updatePartnerHandler = async (params: PartnerModel) => {
    try {
        console.log(params, ' params');
        const response = await fetch(partnerAPI.partnerAPI().update_partner, {
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
};

export const removePartnerHandler = async (partner: PartnerModel) => {
    try {
        const response = await fetch(partnerAPI.partnerAPI(partner._id).delete_partner, {
            method: "DELETE",
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

export const retrivePartnerHandler = async () => {
    try {
        const response = await fetch(partnerAPI.partnerAPI().retrive_partner, {
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
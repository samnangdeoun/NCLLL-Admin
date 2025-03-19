import memberAPI from "../../../apis/memberUrl.ts";
import type Member from "../../model/member/Member.ts";
import type ApiResponse from "../../mapping/BaseResponse.ts";

export const createMemberHandler = async (params: Member) => {
    try {
        const response = await fetch(memberAPI.memberAPI().create_member, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
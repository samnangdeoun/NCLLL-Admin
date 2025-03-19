import sponsorAPI from "../../../apis/sponsorUrl.ts";
import type Sponsor from "../../model/sponsor/Sponsor.ts";
import type ApiResponse from "../../mapping/BaseResponse.ts";

export const createSponsorHandler = async (params: Sponsor) => {
    try {
        const response = await fetch(sponsorAPI.sponsorAPI().create_sponsor, {
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
import positionAPI from "../../../apis/positionUrl.ts";
import type Position from "../../model/position/Position.ts";
import type ApiResponse from "../../mapping/BaseResponse.ts";

export const createPositionHandler = async (params: Position) => {
    try {
        const response = await fetch(positionAPI.positionAPI().create_position, {
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
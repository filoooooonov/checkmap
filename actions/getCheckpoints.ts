"use server";


import Checkpoint from "@/models/checkpoint";
import { connectMongoDB } from "@/utils/mongo";

export async function getCheckpoints(eventCode: string) {
    await connectMongoDB();
    if (eventCode === "") return []; //TODO: FIX
    const checkpoints = await Checkpoint.find({ event: eventCode });

    if (!checkpoints || checkpoints.length === 0) return [];
    else {
        const serializedCheckpoints = checkpoints.map((checkpoint: any) =>
            JSON.parse(
                JSON.stringify({
                    ...checkpoint.toObject(),
                    _id: checkpoint._id.toString(),
                })
            )
        );
        return serializedCheckpoints;
    }
}
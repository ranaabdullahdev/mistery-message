import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const userAggregate = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);


    if (!userAggregate || userAggregate.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found",
        },
        { status: 401 }
      );
    }
    return Response.json(
      {
        success: true,
        messages: userAggregate[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("An unexpected Error occured", error);
    return Response.json(
      {
        success: false,
        message: "Unexpected Error occured",
      },
      { status: 500 }
    );
  }
}

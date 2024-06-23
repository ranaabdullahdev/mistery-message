import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { User } from "next-auth";

export async function POST(request: Request) {
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

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to updated user status accept messages",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        updatedUser,
        message: "Message acceptane status updated successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Failed to updated user status accept messages");
    return Response.json(
      {
        success: false,
        message: "Failed to updated user status accept messages",
      },
      { status: 500 }
    );
  }
}

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

  const userId = user._id;

  const userfound = await UserModel.findById(userId);
  try {
    if (!userfound)
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );

    return Response.json(
      {
        success: true,
        isAcceptingMessage: userfound.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to updated user status accept messages");
    return Response.json(
      {
        success: false,
        message: "Error in getting message acceptance status",
      },
      { status: 500 }
    );
  }
}

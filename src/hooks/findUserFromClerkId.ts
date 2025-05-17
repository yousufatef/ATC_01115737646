import { connect } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs/server";

export const findUserFromClerkId = async () => {
    const { userId: clerkId } = await auth();
    await connect();

    let dbUserId = "";

    if (clerkId) {
        const user = await User.findOne({ clerkId });
        if (user) dbUserId = user._id.toString();
    }

    return { dbUserId };
};

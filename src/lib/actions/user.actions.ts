import { IUser } from "@/types/user.type";
import { connect } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";

export const createOrUpdateUser = async ({
    id,
    first_name,
    last_name,
    image_url,
    email_addresses
}: IUser) => {
    try {
        await connect()
        const user = await User.findOneAndUpdate(
            { clerkId: id }, {
            $set: {
                firstName: first_name,
                lastName: last_name,
                profilePicture: image_url,
                email: email_addresses[0].email_address,
            }
        }, {
            new: true,
            upsert: true
        })
        return user

    }
    catch (error) {
        handleError(error)
    }
}

export const getUserById = async (userId: string) => {
    try {
        await connect()
        const user = await User.findOne({ _id: userId })
        return user
    } catch (error) {
        handleError(error)
    }
}
export const getAllUsers = async () => {
    try {
        await connect()
        const users = await User.find()
        return users
    } catch (error) {
        handleError(error)
    }
}

export const deleteUser = ({ id }: { id: string }) => {
    try {
        connect()
        return User.findOneAndDelete({ clerkId: id })
    } catch (error) {
        handleError(error)
    }
}
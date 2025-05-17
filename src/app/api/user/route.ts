// /app/api/users/route.ts
import { connect } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import { handleError } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        await connect()
        const users = await User.find()
        return NextResponse.json(users)
    } catch (error) {
        handleError(error)
    }
}

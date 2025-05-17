import mongoose from 'mongoose'

export const connect = async () => {
    mongoose.set('strictQuery', true)

    if (mongoose.connection.readyState >= 1) {
        console.log('✅ MongoDB already connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "eventBooking",
            autoIndex: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
        })
        console.log('✅ MongoDB connected')
    } catch (error) {
        console.error('❌ MongoDB connection error:', error)
    }
}

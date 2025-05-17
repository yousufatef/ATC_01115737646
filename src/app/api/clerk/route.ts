import { createOrUpdateUser, deleteUser } from '@/lib/actions/user.actions';
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server';
export async function POST(request: Request) {
    const payload: WebhookEvent = await request.json()
    console.log(payload)

    try {
        // Handle different webhook events
        switch (payload.type) {
            case 'user.created':
            case 'user.updated':
                const {
                    id,
                    first_name,
                    last_name,
                    image_url,
                    email_addresses,
                } = payload.data;
                try {
                    const user = await createOrUpdateUser({
                        id,
                        first_name,
                        last_name,
                        image_url,
                        email_addresses,
                    });
                    if (user && payload.type === 'user.created') {
                        try {
                            const clerk = await clerkClient();
                            await clerk.users.updateUserMetadata(id, {
                                publicMetadata: {
                                    userMongoId: user._id,
                                    isAdmin: user.isAdmin,
                                },
                            });
                        } catch (error) {
                            console.error("Error creating user:", error);
                        }
                    }
                    console.log('User created or updated:', id);
                } catch (error) {
                    console.error("Error creating or updating user:", error);
                }
                break;

            case 'user.deleted':
                try {
                    const { id } = payload.data;
                    if (id) {
                        await deleteUser({ id });
                    } else {
                        console.error("Error: 'id' is undefined for user.deleted event");
                    }
                } catch (error) {
                    console.error("Error deleting user:", error);
                }
                break;

            default:
                console.log('Unhandled event type:', payload.type);
        }

        return Response.json({ message: 'Webhook received and processed' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return Response.json(
            { error: 'Error processing webhook' },
            { status: 500 }
        );
    }
}

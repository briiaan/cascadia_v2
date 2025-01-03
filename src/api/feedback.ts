import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
    const errors = {first_name: "", email: "", message: ""}

        // GETS DATA
        const data = await request.formData();
        const first_name = data.get("firstname");
        const last_name = data.get("lastname");
        const email = data.get("email");
        const message = data.get("message");

        // VALIDATES
        if(typeof first_name !== "string" || first_name.length < 1) {
            errors.first_name += "Please enter a name.";
        }
        if(typeof email !== "string" || email.length < 1) {
            errors.email += "Please enter a a valid email.";
        }
        if(typeof message !== "string" || message.length < 1) {
            errors.message += "Please enter a message.";
        }
        if(errors.first_name || errors.email || errors.message) {
            console.log("UHM")
            return new Response(
                JSON.stringify(
                    {notice: "errors"}
                ),
                { status: 400 }
            )
        } else {
            console.log("HERE")
            return new Response(
                JSON.stringify({
                    notice: "success"
                }),
                { status: 200 }
            )
        }
}
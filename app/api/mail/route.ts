import { NextResponse } from 'next/server';
const sgMail = require('@sendgrid/mail');

export async function POST(request: Request) {
    if (!process.env.SENDGRID_API_KEY || !process.env.MAIL_TO || !process.env.MAIL_FROM) {
        console.error('Missing environment variables');
        return NextResponse.json(
            { message: "Server configuration error" },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate inputs
        if (!name || !email || !message) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Set SendGrid API key
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const emailBody = `
            Name: ${name}
            Email: ${email}
            Message: ${message}
        `;

        const data = {
            to: process.env.MAIL_TO,
            from: process.env.MAIL_FROM,
            subject: `${name.toUpperCase()} sent you a message from Portfolio`,
            text: emailBody,
            html: emailBody.replace(/\n/g, "<br>")
        };

        try {
            await sgMail.send(data);
            return NextResponse.json(
                { message: "Your message was sent successfully!" },
                { status: 200 }
            );
        } catch (err) {
            console.error('SendGrid Error:', err);
            return NextResponse.json(
                { message: "Failed to send message. Please try again later." },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Request Error:', error);
        return NextResponse.json(
            { message: "Invalid request format" },
            { status: 400 }
        );
    }
}

// Handle other HTTP methods
export async function GET() {
    return NextResponse.json(
        { message: "This endpoint only accepts POST requests" },
        { status: 405 }
    );
}
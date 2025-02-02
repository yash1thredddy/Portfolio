import { NextResponse } from 'next/server';
const sgMail = require('@sendgrid/mail');

export async function POST(request: Request) {
    try {
        // Get the request body
        const body = await request.json();
        const { name, email, message } = body;

        // Set SendGrid API key
        sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

        const msg = `Name: ${name}\r\n Email: ${email}\r\n Message: ${message}`;
        const data = {
            to: process.env.MAIL_TO,
            from: process.env.MAIL_FROM,
            subject: `${name.toUpperCase()} sent you a message from Portfolio`,
            text: `Email => ${email}`,
            html: msg.replace(/\r\n/g, "<br>"),
        };

        try {
            await sgMail.send(data);
            return NextResponse.json(
                { message: "Your message was sent successfully." },
                { status: 200 }
            );
        } catch (err) {
            console.error('SendGrid Error:', err);
            return NextResponse.json(
                { message: "There was an error sending your message." },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Request Error:', error);
        return NextResponse.json(
            { message: "Invalid request" },
            { status: 400 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: "This endpoint only accepts POST requests" },
        { status: 405 }
    );
}
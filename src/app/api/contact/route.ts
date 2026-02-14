import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, phone } = body;

    // Email to Admin (Bijoux.iyl01@gmail.com)
    await resend.emails.send({
      from: 'Bijoux Contact <onboarding@resend.dev>',
      to: 'Bijoux.iyl01@gmail.com',
      subject: `New Contact: ${subject}`,
      html: `
        <h1>New Message from ${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message}</p>
      `
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

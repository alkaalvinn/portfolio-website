// src/actions/sendEmail.ts
import emailjs from '@emailjs/browser';

export async function sendEmail(senderEmail: string, message: string) {
  try {
    const templateParams = {
      from_email: senderEmail,
      message: message,
      to_email: 'alkaalvinn@gmail.com',
      from_name: senderEmail.split('@')[0],
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    console.log('Email sent successfully:', response);
    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to send email" 
    };
  }
}
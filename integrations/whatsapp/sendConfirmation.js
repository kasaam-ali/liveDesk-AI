const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

export async function sendWhatsAppConfirmation({ visitorName, visitorPhone, appointmentTime, businessName }) {
  // Twilio requires the twilio package: npm install twilio
  // This is a template — uncomment and configure when Twilio is set up.

  /*
  const twilio = require('twilio');
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  const message = await client.messages.create({
    from: TWILIO_WHATSAPP_NUMBER,
    to: `whatsapp:+92${visitorPhone}`,
    body: `
🏫 *${businessName || 'Saylani Mass IT'}*

Assalam-o-Alaikum *${visitorName}*!

Thank you for visiting us. ✅

📅 Appointment: *${appointmentTime}*

If you have any questions, please reply to this message.
Shukriya! 🙏
    `.trim(),
  });

  return message.sid;
  */

  // For now, log the confirmation
  console.log(`[WhatsApp] Confirmation sent to ${visitorName} at ${visitorPhone}`);
  return `simulated-sid-${Date.now()}`;
}

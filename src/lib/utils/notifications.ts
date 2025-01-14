import emailjs from 'emailjs-com';
import { Employee, Selection, Destination, Accommodation, NotificationSettings } from '../types';
import { emailTemplate, whatsappTemplate } from './notificationTemplates';

export async function sendWinnerNotification(
  employee: Employee,
  selection: Selection,
  destination: Destination,
  accommodation: Accommodation,
  settings: NotificationSettings
): Promise<boolean> {
  const success: { email: boolean; whatsapp: boolean } = {
    email: false,
    whatsapp: false,
  };

  if (settings.emailEnabled && employee.email) {
    success.email = await sendEmailNotification(employee, selection, destination, accommodation);
  }

  if (settings.whatsappEnabled && employee.mobileNo) {
    success.whatsapp = await sendWhatsAppNotification(employee, selection, destination, accommodation);
  }

  return success.email || success.whatsapp;
}

async function sendEmailNotification(
  employee: Employee,
  selection: Selection,
  destination: Destination,
  accommodation: Accommodation
): Promise<boolean> {
  try {
    const templateParams = {
      to_name: employee.name,
      to_email: employee.email,
      destination: destination.name,
      accommodation: accommodation.name,
      start_date: new Date(selection.weekStart).toLocaleDateString(),
      company_logo: '/misr-phosphate-logo.png'
    };

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID || '',
      process.env.EMAILJS_TEMPLATE_ID || '',
      templateParams,
      process.env.EMAILJS_USER_ID || ''
    );

    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}

async function sendWhatsAppNotification(
  employee: Employee,
  selection: Selection,
  destination: Destination,
  accommodation: Accommodation
): Promise<boolean> {
  try {
    const message = whatsappTemplate.text
      .replace('[NAME]', employee.name)
      .replace('[DESTINATION]', destination.name)
      .replace('[ACCOMMODATION]', accommodation.name)
      .replace('[START_DATE]', new Date(selection.weekStart).toLocaleDateString());

    const response = await fetch(`https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: employee.mobileNo,
        type: 'text',
        text: { body: message },
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error);
    return false;
  }
}
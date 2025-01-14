export const emailTemplate = {
  subject: 'Congratulations! You Won the Summer Trip Selection',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <img src="[COMPANY_LOGO]" alt="Misr Phosphate" style="max-width: 200px; margin-bottom: 20px;">
      
      <h1 style="color: #00A651; margin-bottom: 20px;">Congratulations [NAME]! 🎉</h1>
      
      <p style="margin-bottom: 15px;">
        We are pleased to inform you that you have won the summer trip selection!
      </p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #00A651; margin-top: 0;">Trip Details</h2>
        <p><strong>Destination:</strong> [DESTINATION]</p>
        <p><strong>Accommodation:</strong> [ACCOMMODATION]</p>
        <p><strong>Travel Week:</strong> Starting [START_DATE]</p>
      </div>
      
      <p style="margin-bottom: 15px;">
        Please keep this information for your records. Additional details and instructions will be provided closer to your travel date.
      </p>
      
      <p style="color: #666;">
        Best regards,<br>
        Misr Phosphate Team
      </p>
    </div>
  `,
};

export const whatsappTemplate = {
  text: `🎉 Congratulations [NAME]!

You have won the summer trip selection!

🏖️ Trip Details:
📍 Destination: [DESTINATION]
🏨 Accommodation: [ACCOMMODATION]
📅 Travel Week: Starting [START_DATE]

Please check your email for more details.

Best regards,
Misr Phosphate Team`,
};
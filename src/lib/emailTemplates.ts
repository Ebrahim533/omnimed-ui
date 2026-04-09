// Email template content for EmailJS templates
// These are reference templates to copy into EmailJS dashboard

export const adminEmailTemplate = {
  subject: "New Appointment Booking Received - {{booking_id}}",
  body: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Appointment Booking</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #2563EB, #1D4ED8); padding: 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
    .content { padding: 30px; }
    .alert-box { background: #DBEAFE; border-left: 4px solid #2563EB; padding: 15px; margin-bottom: 25px; border-radius: 0 8px 8px 0; }
    .alert-box h3 { margin: 0 0 10px 0; color: #1E40AF; font-size: 16px; }
    .alert-box p { margin: 0; color: #1E40AF; font-size: 14px; }
    .details-grid { display: table; width: 100%; margin-bottom: 20px; }
    .detail-row { display: table-row; }
    .detail-label { display: table-cell; padding: 10px 0; font-weight: 600; color: #6B7280; width: 40%; vertical-align: top; }
    .detail-value { display: table-cell; padding: 10px 0; color: #111827; vertical-align: top; }
    .notes-section { background: #F9FAFB; padding: 20px; border-radius: 8px; margin-top: 20px; }
    .notes-section h4 { margin: 0 0 10px 0; color: #374151; font-size: 14px; }
    .notes-section p { margin: 0; color: #6B7280; font-size: 14px; }
    .footer { background: #F3F4F6; padding: 20px; text-align: center; font-size: 12px; color: #9CA3AF; }
    .footer p { margin: 0; }
    .timestamp { color: #6B7280; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏥 New Appointment Booking</h1>
    </div>
    <div class="content">
      <div class="alert-box">
        <h3>New Booking Received!</h3>
        <p>A new appointment has been scheduled through the website.</p>
      </div>
      
      <h2 style="color: #111827; font-size: 18px; margin-bottom: 20px;">Booking Details</h2>
      
      <div class="details-grid">
        <div class="detail-row">
          <div class="detail-label">Booking ID:</div>
          <div class="detail-value" style="font-weight: 600; color: #2563EB;">{{booking_id}}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Patient Name:</div>
          <div class="detail-value">{{from_name}}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Email:</div>
          <div class="detail-value">{{from_email}}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Phone:</div>
          <div class="detail-value">{{phone}}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Department:</div>
          <div class="detail-value">{{department}}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Doctor:</div>
          <div class="detail-value">{{doctor}}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Appointment Date:</div>
          <div class="detail-value" style="font-weight: 600; color: #2563EB;">{{appointment_date}}</div>
        </div>
      </div>
      
      <div class="notes-section">
        <h4>📝 Additional Notes</h4>
        <p>{{notes}}</p>
      </div>
      
      <div class="timestamp">
        <strong>Booking Timestamp:</strong> {{timestamp}}
      </div>
    </div>
    <div class="footer">
      <p>© 2024 OmniMed Health. This is an automated notification.</p>
    </div>
  </div>
</body>
</html>
`,
};

export const userEmailTemplate = {
  subject: "Appointment Confirmation - {{booking_id}}",
  body: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #2563EB, #1D4ED8); padding: 40px 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0 0 10px 0; font-size: 28px; font-weight: 600; }
    .header p { color: rgba(255,255,255,0.9); margin: 0; font-size: 16px; }
    .content { padding: 30px; }
    .success-icon { width: 60px; height: 60px; background: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 30px; }
    .confirmation-box { background: linear-gradient(135deg, #D1FAE5, #A7F3D0); border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 30px; }
    .confirmation-box h2 { color: #065F46; margin: 0 0 10px 0; font-size: 20px; }
    .confirmation-box p { color: #047857; margin: 0; font-size: 14px; }
    .booking-id { background: #ffffff; border-radius: 8px; padding: 15px; margin-top: 15px; font-size: 18px; font-weight: 600; color: #2563EB; letter-spacing: 1px; }
    .details-section { margin-bottom: 25px; }
    .details-section h3 { color: #111827; font-size: 16px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #E5E7EB; }
    .details-grid { display: table; width: 100%; }
    .detail-row { display: table-row; }
    .detail-label { display: table-cell; padding: 8px 0; font-weight: 500; color: #6B7280; width: 40%; vertical-align: top; }
    .detail-value { display: table-cell; padding: 8px 0; color: #111827; vertical-align: top; }
    .info-box { background: #EFF6FF; border-radius: 8px; padding: 20px; margin: 25px 0; }
    .info-box h4 { margin: 0 0 10px 0; color: #1E40AF; font-size: 14px; }
    .info-box p { margin: 0; color: #3B82F6; font-size: 13px; line-height: 1.5; }
    .contact-section { background: #F9FAFB; border-radius: 8px; padding: 20px; text-align: center; margin-top: 25px; }
    .contact-section h4 { margin: 0 0 15px 0; color: #374151; font-size: 14px; }
    .contact-section a { color: #2563EB; text-decoration: none; font-weight: 500; }
    .footer { background: #1F2937; padding: 30px; text-align: center; color: #9CA3AF; }
    .footer h3 { color: #ffffff; margin: 0 0 10px 0; font-size: 18px; }
    .footer p { margin: 5px 0; font-size: 13px; }
    .social-links { margin-top: 15px; }
    .social-links a { display: inline-block; margin: 0 10px; color: #6B7280; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>OmniMed Health</h1>
      <p>Your Health, Our Priority</p>
    </div>
    <div class="content">
      <div class="confirmation-box">
        <div class="success-icon">✓</div>
        <h2>Appointment Confirmed!</h2>
        <p>Thank you for booking with OmniMed Health. Your appointment has been successfully scheduled.</p>
        <div class="booking-id">{{booking_id}}</div>
      </div>
      
      <div class="details-section">
        <h3>Appointment Details</h3>
        <div class="details-grid">
          <div class="detail-row">
            <div class="detail-label">Patient Name:</div>
            <div class="detail-value">{{to_name}}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Department:</div>
            <div class="detail-value">{{department}}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Doctor:</div>
            <div class="detail-value">{{doctor}}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Date & Time:</div>
            <div class="detail-value" style="font-weight: 600; color: #2563EB;">{{appointment_date}}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Notes:</div>
            <div class="detail-value">{{notes}}</div>
          </div>
        </div>
      </div>
      
      <div class="info-box">
        <h4>📋 What to Bring</h4>
        <p>Please bring a valid ID, insurance card, and any relevant medical records or test results. Arrive 15 minutes before your scheduled appointment time.</p>
      </div>
      
      <div class="info-box" style="background: #FEF3C7;">
        <h4 style="color: #92400E;">⚠️ Cancellation Policy</h4>
        <p style="color: #A16207;">If you need to reschedule or cancel, please contact us at least 24 hours in advance to avoid any cancellation fees.</p>
      </div>
      
      <div class="contact-section">
        <h4>Need to make changes?</h4>
        <p style="margin: 0;">
          Call us at <a href="tel:{{company_phone}}">{{company_phone}}</a><br>
          or email <a href="mailto:{{company_email}}">{{company_email}}</a>
        </p>
      </div>
    </div>
    <div class="footer">
      <h3>OmniMed Health</h3>
      <p>Providing exceptional healthcare services</p>
      <p>{{company_email}} | {{company_phone}}</p>
      <div class="social-links">
        <a href="#">Website</a> • <a href="#">Contact</a>
      </div>
      <p style="margin-top: 20px; font-size: 11px; color: #6B7280;">
        © 2024 OmniMed Health. All rights reserved.<br>
        This is an automated confirmation email. Please do not reply to this email.
      </p>
    </div>
  </div>
</body>
</html>
`,
};

// Instructions for setting up EmailJS templates
export const emailJSSetupInstructions = `
# EmailJS Setup Instructions

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

## Step 2: Add Email Service
1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps
5. Copy the Service ID (e.g., 'service_abc123')

## Step 3: Create Admin Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Name it "Admin Notification"
4. Set Subject: "New Appointment Booking Received - {{booking_id}}"
5. Copy the HTML from adminEmailTemplate.body above
6. Save the template and copy the Template ID

## Step 4: Create User Email Template
1. Click "Create New Template"
2. Name it "User Confirmation"
3. Set Subject: "Appointment Confirmation - {{booking_id}}"
4. Copy the HTML from userEmailTemplate.body above
5. Save the template and copy the Template ID

## Step 5: Get Public Key
1. Go to "Account" > "General"
2. Copy your Public Key

## Step 6: Add to Environment Variables
Add these to your .env file:

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id
VITE_EMAILJS_USER_TEMPLATE_ID=your_user_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_ADMIN_EMAIL=admin@omnimedhealth.org

## Step 7: Test
1. Install dependency: npm install @emailjs/browser
2. Restart your dev server
3. Book an appointment to test emails

## Available Template Variables:
Admin Template:
- {{to_email}} - Admin email address
- {{from_name}} - Patient name
- {{from_email}} - Patient email
- {{phone}} - Patient phone
- {{department}} - Selected department
- {{doctor}} - Selected doctor
- {{appointment_date}} - Appointment date/time
- {{notes}} - Additional notes
- {{booking_id}} - Unique booking ID
- {{timestamp}} - Booking timestamp

User Template:
- {{to_email}} - Patient email
- {{to_name}} - Patient name
- {{department}} - Selected department
- {{doctor}} - Selected doctor
- {{appointment_date}} - Appointment date/time
- {{notes}} - Additional notes
- {{booking_id}} - Unique booking ID
- {{company_name}} - "OmniMed Health"
- {{company_email}} - Admin email
- {{company_phone}} - Company phone
`;

export default {
  adminEmailTemplate,
  userEmailTemplate,
  emailJSSetupInstructions,
};

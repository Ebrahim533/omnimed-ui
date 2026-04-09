# Appointment Booking Email Notification System Setup

## Overview

This appointment booking system includes automatic email notifications:
- **Admin Notification**: Sent to admin when a new appointment is booked
- **User Confirmation**: Sent to the patient confirming their appointment

## Quick Start

### 1. Install EmailJS Dependency

```bash
npm install @emailjs/browser
```

Or if using bun:
```bash
bun add @emailjs/browser
```

### 2. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 3. Add Email Service

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the authentication steps
5. Copy the **Service ID** (e.g., `service_abc123`)

### 4. Create Email Templates

#### Admin Notification Template

1. Go to **"Email Templates"** → **"Create New Template"**
2. Name: `Admin Notification`
3. Subject: `New Appointment Booking Received - {{booking_id}}`
4. Switch to HTML mode and paste the template from `src/lib/emailTemplates.ts` (adminEmailTemplate.body)
5. Save and copy the **Template ID**

#### User Confirmation Template

1. Create another template
2. Name: `User Confirmation`
3. Subject: `Appointment Confirmation - {{booking_id}}`
4. Switch to HTML mode and paste the template from `src/lib/emailTemplates.ts` (userEmailTemplate.body)
5. Save and copy the **Template ID**

### 5. Get Your Public Key

1. Go to **"Account"** → **"General"**
2. Copy your **Public Key**

### 6. Configure Environment Variables

Update your `.env` file with the values from EmailJS:

```env
VITE_EMAILJS_SERVICE_ID=service_your_service_id
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_your_admin_template
VITE_EMAILJS_USER_TEMPLATE_ID=template_your_user_template
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_ADMIN_EMAIL=admin@omnimedhealth.org
```

### 7. Restart Development Server

```bash
npm run dev
```

## Template Variables

### Admin Template Variables

| Variable | Description |
|----------|-------------|
| `{{to_email}}` | Admin email address |
| `{{from_name}}` | Patient name |
| `{{from_email}}` | Patient email |
| `{{phone}}` | Patient phone |
| `{{department}}` | Selected department |
| `{{doctor}}` | Selected doctor |
| `{{appointment_date}}` | Appointment date/time |
| `{{notes}}` | Additional notes |
| `{{booking_id}}` | Unique booking ID |
| `{{timestamp}}` | Booking timestamp |

### User Template Variables

| Variable | Description |
|----------|-------------|
| `{{to_email}}` | Patient email |
| `{{to_name}}` | Patient name |
| `{{department}}` | Selected department |
| `{{doctor}}` | Selected doctor |
| `{{appointment_date}}` | Appointment date/time |
| `{{notes}}` | Additional notes |
| `{{booking_id}}` | Unique booking ID |
| `{{company_name}}` | "OmniMed Health" |
| `{{company_email}}` | Admin email |
| `{{company_phone}}` | Company phone |

## How It Works

1. User fills out the appointment form
2. On submit, the system:
   - Validates all required fields
   - Generates a unique booking ID
   - Sends admin notification email
   - Sends user confirmation email
3. Success screen shows with booking details

## Error Handling

- If email service is not configured, the booking still succeeds but emails aren't sent
- Email failures are logged to console but don't block the user experience
- An alert is shown if email sending fails

## Testing

1. Use the EmailJS "Test Email" feature to verify templates
2. Book a test appointment on the site
3. Check both admin and user email inboxes

## Troubleshooting

### Emails not sending
- Check that all environment variables are set correctly
- Verify EmailJS service is connected properly
- Check browser console for error messages

### Emails going to spam
- Add SPF/DKIM records to your domain (for custom domains)
- Use a reputable email provider
- Avoid spam trigger words in templates

### Variables not appearing
- Ensure variable names match exactly (case-sensitive)
- Check template is saved in HTML mode
- Verify template ID is correct in .env

## Security Notes

- Never commit `.env` file with real credentials
- EmailJS public key is safe to use client-side
- Templates are managed in EmailJS dashboard
- Consider adding rate limiting for production

## Free Tier Limits

EmailJS free tier includes:
- 200 emails/month
- 2 email templates
- 1 email service

For higher volumes, upgrade to a paid plan.

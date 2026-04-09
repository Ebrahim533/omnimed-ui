// EmailJS stub - install @emailjs/browser and configure env vars to enable
export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  department: string;
  doctor: string;
  date: string;
  notes?: string;
  bookingId: string;
}

export const initEmailJS = async () => {
  console.warn('EmailJS not installed. Run: npm install @emailjs/browser');
};

export const isEmailConfigured = (): boolean => false;

export const sendAdminNotification = async (_data: AppointmentData): Promise<boolean> => {
  console.warn('EmailJS not configured. Skipping admin notification.');
  return false;
};

export const sendUserConfirmation = async (_data: AppointmentData): Promise<boolean> => {
  console.warn('EmailJS not configured. Skipping user confirmation.');
  return false;
};

export const sendAppointmentEmails = async (_data: AppointmentData): Promise<{
  adminSent: boolean;
  userSent: boolean;
}> => {
  console.warn('EmailJS not configured. Skipping email notifications.');
  return { adminSent: false, userSent: false };
};

export const generateBookingId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `OM-${timestamp}-${random}`;
};

export default {
  sendAppointmentEmails,
  sendAdminNotification,
  sendUserConfirmation,
  isEmailConfigured,
  initEmailJS,
  generateBookingId,
};

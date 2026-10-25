export function isInquiryDeliveryConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.STUDIO_INQUIRY_EMAIL,
  );
}

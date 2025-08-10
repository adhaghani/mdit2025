export const createWhatsAppLink = (
  number: string,
  name: string,
  role: string
) => {
  const message = encodeURIComponent(
    `Hello ${name}, I would like to inquire about MDIT 2025. I understand you handle ${role.toLowerCase()} matters.`
  );
  return `https://wa.me/${number.replace(/[^0-9]/g, "")}?text=${message}`;
};

// Be able to receive a phone number and a message (with breaklines) and generate a WhatsApp link

export const whatsappLinkGenerator = (phone, message) => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
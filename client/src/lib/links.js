import { contact } from "../content";

export const whatsappUrl = (text = contact.defaultMessage) =>
  `https://api.whatsapp.com/send?phone=${contact.whatsapp}&text=${encodeURIComponent(text)}`;

// Sem link do Google Agenda configurado, o agendamento é pedido pelo WhatsApp.
export const agendaUrl = () => contact.agendaUrl || whatsappUrl(contact.agendaMessage);

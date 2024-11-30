import moment from 'moment';

interface TemplateElements {
  name?: string;
  partner?: string;
  time?: string;
  hourGap?: number;
}


const grettings = (name: string, partner: string) => {
  return `Hola ${name.trim()}! Te escribimos de *Rocket Envíos* 🚀, tenemos un pedido para tí de *${partner.trim()}*`;
}

const timeNotify = (time: string, hourGap: number) => {  
  const minTime = moment(time, 'HH:mm').subtract(hourGap, 'hours').format('HH:mm');
  const maxTime = moment(time, 'HH:mm').add(hourGap, 'hours').format('HH:mm');
  return `🕘 El pedido llegará entre las *${minTime}* y las *${maxTime}*`;
}

export const templateBuilder = ({name = '', partner = '', time = '', hourGap = 0}: TemplateElements) => {
  return `${grettings(name, partner)}\n${timeNotify(time, hourGap)}`;
}


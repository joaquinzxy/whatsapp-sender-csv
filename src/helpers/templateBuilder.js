import moment from 'moment';

const grettings = (name, partner) => {
  return `Hola ${name}! Te escribimos de Rocket Envíos 🚀, tenemos un pedido para tí de ${partner}`;
}

const timeNotify = (time, hourGap) => {
  const minTime = moment(time).subtract(hourGap, 'hours').format('HH:mm');
  const maxTime = moment(time).add(hourGap, 'hours').format('HH:mm');
  return `🕘 El pedido llegará entre las ${minTime} y las ${maxTime}`;
}

export const templateBuilder = ({name, partner, time, hourGap}) => {
  return `${grettings(name, partner)}\n${timeNotify(time, hourGap)}`;
}


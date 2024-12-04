import moment from 'moment';

interface TemplateElements {
  name?: string;
  partner?: string;
  time?: string;
  hourGap?: number;
  shipmentCost?: number;
  productCost?: number;
  totalCost?: number;
}

const grettings = (name: string, partner: string) => {
  return `🚀 Hola ${name.trim()}, como estás? Te hablamos de ROCKET envíos, tenemos una entrega de parte de *${partner.trim()}*`;
}

const timeNotify = (time: string, hourGap: number) => {  
  const minTime = moment(time, 'HH:mm').subtract(hourGap, 'hours').format('HH:mm');
  const maxTime = moment(time, 'HH:mm').add(hourGap, 'hours').format('HH:mm');
  return `⌚ Te informamos que vamos a estar pasando entre  *${minTime}* - *${maxTime}.* Mas cercano a la hora te paso bien cuando voy a estar llegando y 5min antes te mandamos ubicación en tiempo real.`;
}

const costNotify = (shipmentCost: number, productCost: number, total: number) => {
  if ((shipmentCost && shipmentCost > 0) && (productCost && productCost > 0)) {
    return `\n\n💵Nos informaron que tenés que abonar $${shipmentCost} de envío + $${productCost} del producto. Siendo un total de $${(Number(shipmentCost)+Number(productCost))}`
  }

  if (shipmentCost && shipmentCost > 0) {
    return `\n\n💵Nos informaron que tenés que abonar $${shipmentCost} del envío. Avísame si vas a necesitar cambio asi estamos preparados.`
  }

  if (productCost && productCost > 0) {
    return `\n\n💵Nos informaron que tenés que abonar $${productCost} del producto. Avísame si vas a necesitar cambio asi estamos preparados.`
  }

  if (total && total > 0) {
    return `\n\n💵Nos informaron que tenés que abonar $${total}. Avísame si vas a necesitar cambio asi estamos preparados`
  }

  return '';
}

const additionalInfo = '⚠️Recorda que no ingresamos en pasajes, edificios, oficinas, complejos y shoppings 🤗🤗'

export const templateBuilder = ({
  name = '',
  partner = '',
  time = '',
  hourGap = 0,
  shipmentCost = 0,
  productCost = 0,
  totalCost = 0
} : TemplateElements) => {
  return `${grettings(name, partner)}\n\n${timeNotify(time, hourGap)}${costNotify(shipmentCost, productCost, totalCost)}\n\n${additionalInfo}`;
}


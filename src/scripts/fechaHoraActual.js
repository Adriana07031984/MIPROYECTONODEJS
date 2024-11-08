import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

function obtenerFechaYHoraActual() {
    // Obtener la hora actual en UTC, el servidor siempre lo tendrá en UTC pues asi debe ser siempre en los servidores
    const timeStampActual = dayjs().utc();

    const timeStampUTCMinus5 = timeStampActual.subtract(5, 'hour');

    const fechaActual = timeStampUTCMinus5.format('YYYY-MM-DD');
    const horaActual = timeStampUTCMinus5.format('HH:mm:ss');

    return { fechaActual, horaActual };
}

export { obtenerFechaYHoraActual };
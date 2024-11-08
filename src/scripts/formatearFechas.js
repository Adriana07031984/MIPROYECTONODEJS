// Función para dar formato a una fecha en formato YYYY-MM-DD
function formatearFechaYYYY_MM_DD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export {formatearFechaYYYY_MM_DD}
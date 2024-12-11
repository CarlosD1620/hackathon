const cultivos = JSON.parse(localStorage.getItem('cultivos')) || [];
const siembras = JSON.parse(localStorage.getItem('siembras')) || [];
const estados = JSON.parse(localStorage.getItem('estados')) || [];

// Función para organizar cultivos por meses
function organizarPorMes(cultivos) {
    const meses = {};

    cultivos.forEach(cultivo => {
        const fecha = new Date(cultivo._fechaSiembra || cultivo._fechaRegistro);
        const mes = fecha.toLocaleString('default', { month: 'long' });

        // Inicializar el mes si no existe
        if (!meses[mes]) meses[mes] = [];

        // Relacionar cultivo con siembra y estado
        const siembra = siembras.find(s => s._id === cultivo._id_siembra) || null;
        const estado = estados.find(e => e._id === cultivo._id_estado) || null;

        meses[mes].push({
            ...cultivo,
            siembra,
            estado,
        });
    });

    return meses;
}

// Obtener cultivos organizados por meses
const cultivosPorMes = organizarPorMes(cultivos);

// Mostrar en consola (puedes usar una librería de calendario para mostrar visualmente)
console.log(cultivosPorMes);

// Ejemplo de visualización básica
Object.keys(cultivosPorMes).forEach(mes => {
    console.log(`Mes: ${mes}`);
    cultivosPorMes[mes].forEach(cultivo => {
        console.log(`Cultivo: ${cultivo._nombre}`);
        console.log(`  Siembra: ${cultivo.siembra?._nombre || 'No tiene siembra'}`);
        console.log(`  Estado: ${cultivo.estado?._nombre || 'Sin estado'}`);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const events = [];

    Object.keys(cultivosPorMes).forEach(mes => {
        cultivosPorMes[mes].forEach(cultivo => {
            events.push({
                title: `${cultivo._nombre} (${cultivo.estado?._nombre || 'Sin estado'})`,
                start: cultivo._fechaSiembra || cultivo._fechaRegistro,
            });
        });
    });

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events,
    });

    calendar.render();
});
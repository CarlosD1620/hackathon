// Función para manejar el formulario y agregar los registros
document.getElementById('siembraForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se recargue

    // Obtener los valores del formulario
    const nombrePlanta = document.getElementById('nombrePlanta').value;
    const fechaSiembra = document.getElementById('fechaSiembra').value;
    const cantidad = document.getElementById('cantidad').value;
    const ubicacion = document.getElementById('ubicacion').value;

    // Crear una nueva fila para la tabla
    const tabla = document.getElementById('siembrasTable').getElementsByTagName('tbody')[0];
    const nuevaFila = tabla.insertRow();

    // Insertar celdas con los datos del formulario
    const celdaPlanta = nuevaFila.insertCell(0);
    const celdaFecha = nuevaFila.insertCell(1);
    const celdaCantidad = nuevaFila.insertCell(2);
    const celdaUbicacion = nuevaFila.insertCell(3);

    celdaPlanta.textContent = nombrePlanta;
    celdaFecha.textContent = fechaSiembra;
    celdaCantidad.textContent = cantidad;
    celdaUbicacion.textContent = ubicacion;

    // Limpiar el formulario para nuevos registros
    document.getElementById('siembraForm').reset();
});

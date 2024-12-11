// Función para manejar el formulario y agregar los registros
document.getElementById('siembraForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se recargue

    // Obtener los valores del formulario
    const nombrePlanta = document.getElementById('nombrePlanta').value;
    const cantidad = document.getElementById('cantidad').value;

    // Verifica los valores obtenidos del formulario
    console.log(`Nombre de la Planta: ${nombrePlanta}, Cantidad: ${cantidad}`);

    // Crear una nueva fila para la tabla
    const tabla = document.getElementById('siembrasTable').getElementsByTagName('tbody')[0];
    const nuevaFila = tabla.insertRow();

    // Insertar celdas con los datos del formulario
    const celdaPlanta = nuevaFila.insertCell(0);
    const celdaCantidad = nuevaFila.insertCell(1);
    const celdaAccion = nuevaFila.insertCell(2);

    // Asignar los valores a las celdas
    celdaPlanta.textContent = nombrePlanta;
    celdaCantidad.textContent = cantidad;

    // Crear el botón de eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.style.backgroundColor = 'red';
    botonEliminar.style.color = 'white';
    botonEliminar.style.border = 'none';
    botonEliminar.style.padding = '5px 10px';
    botonEliminar.style.cursor = 'pointer';

    // Agregar el evento de eliminación a la fila específica
    botonEliminar.addEventListener('click', function() {
    // Elimina la fila completa directamente
    this.closest('tr').remove(); // "this" se refiere al botón de eliminar
    });


    // Insertar el botón de eliminar en la celda
    celdaAccion.appendChild(botonEliminar);

    // Limpiar el formulario para nuevos registros
    document.getElementById('siembraForm').reset();
});


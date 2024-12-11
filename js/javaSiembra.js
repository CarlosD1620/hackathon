// Función para manejar el formulario y agregar los registros
document.getElementById('siembraForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se recargue

    // Obtener los valores del formulario
    const nombrePlanta = document.getElementById('nombrePlanta').value;
    
    const cantidad = document.getElementById('cantidad').value;
    
    // Crear una nueva fila para la tabla
    const tabla = document.getElementById('siembrasTable').getElementsByTagName('tbody')[0];
    const nuevaFila = tabla.insertRow();

    // Insertar celdas con los datos del formulario
    const celdaPlanta = nuevaFila.insertCell(0);
    
    const celdaCantidad = nuevaFila.insertCell(1);

    const celdaAccion = nuevaFila.insertCell(2);
    

    celdaPlanta.textContent = nombrePlanta;
    
    celdaCantidad.textContent = cantidad;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.style.backgroundColor = 'red';
    botonEliminar.style.color = 'white';
    botonEliminar.style.border = 'none';
    botonEliminar.style.padding = '5px 10px';
    botonEliminar.style.cursor = 'pointer';
    
    botonEliminar.addEventListener('click', function() {
        tabla.deleteRow(nuevaFila.rowIndex); // Elimina la fila de la tabla
    });

    celdaAccion.appendChild(botonEliminar);

    // Limpiar el formulario para nuevos registros
    document.getElementById('siembraForm').reset();
});

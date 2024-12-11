//Key para local Storage
const KEY_CULTIVO = 'cultivos'
const KEY_SIEMBRA = 'siembra'
const KEY_ESTADO = 'estado'

//######################################################################
//header
// Configuración de las páginas
const pages = {
    index: `<h1>Inicio</h1><p>Bienvenido a la página principal.</p>`,
    cultivos: `<h1>Cultivos</h1><p>Aquí puedes gestionar los cultivos registrados.</p>`,
    siembras: `<h1>Siembras</h1><p>Aquí puedes gestionar las siembras registradas.</p>`,
  };

  // Generar dinámicamente el menú en el header
  const header = document.getElementById('header');
  header.innerHTML = `
    <nav>
    
      <a href="index.html" class="menu-item">Inicio</a>
      <a href="onsultar_siembras.html" class="menu-item">Cultivos</a>
      <a href="onsultar_siembras.html" data-page="siembras" class="menu-item">Siembras</a>
    </nav>
  `;

//######################################################################
/**
 * Gestion de cultivos
 */


// Función para obtener todos los cultivos almacenados en localStorage
function obtenerCultivos() {
    const cultivos = JSON.parse(localStorage.getItem(KEY_CULTIVO)) || [];
    return cultivos;
}

// Función para insertar un cultivo nuevo
function insertarCultivo(cultivo) {
    const cultivos = obtenerCultivos();
    // Asignar un nuevo ID de cultivo
    cultivo.id = cultivos.length ? cultivos[cultivos.length - 1].id + 1 : 1;
    cultivos.push(cultivo);
    localStorage.setItem(KEY_CULTIVO, JSON.stringify(cultivos));
    return true
}

// Función para asignar una siembra a un cultivo
function asignarSiembra(cultivoId, idSiembra) {
    const cultivos = obtenerCultivos();
    const cultivo = cultivos.find(c => c.id === cultivoId);
    
    if (cultivo) {
        cultivo.id_siembra = idSiembra;
        localStorage.setItem(KEY_CULTIVO, JSON.stringify(cultivos));
        return true
    } else {
        return false
    }
}

// Función para cambiar el estado de un cultivo
function cambiarEstado(cultivoId, nuevoEstado) {
    const cultivos = obtenerCultivos();
    const cultivo = cultivos.find(c => c.id === cultivoId);
    
    if (cultivo) {
        cultivo.estado = nuevoEstado;
        localStorage.setItem(KEY_CULTIVO, JSON.stringify(cultivos));
        return true
    } else {
        return
    }
}

// Función para cambiar la siembra asignada a un cultivo
function cambiarSiembra(cultivoId, nuevaSiembraId) {
    const cultivos = obtenerCultivos();
    const cultivo = cultivos.find(c => c.id === cultivoId);
    
    if (cultivo) {
        cultivo.id_siembra = nuevaSiembraId;
        return true
    }
    return false
}


//######################################################################
//Gestion de siembra

function obtenerSiembras() {
    const siembras = JSON.parse(localStorage.getItem(KEY_SIEMBRA)) || [];
    return siembras;
}

// Función para insertar una nueva siembra
function insertarSiembra(nombre) {
    const siembras = obtenerSiembras();
    // Asignar un nuevo ID de siembra (basado en el último ID existente)
    const nuevoId = siembras.length ? siembras[siembras.length - 1].id + 1 : 1;
    
    const nuevaSiembra = {
        id: nuevoId,
        nombre: nombre
    };
    
    siembras.push(nuevaSiembra);
    localStorage.setItem(KEY_SIEMBRA, JSON.stringify(siembras));
}

// Función para obtener una siembra por su ID
function obtenerSiembraPorId(id) {
    const siembras = obtenerSiembras();
    return siembras.find(siembra => siembra.id === id) || null;
}

// Función para mostrar todas las siembras (puedes usarla para ver qué hay en el localStorage)
function mostrarSiembras() {
    const siembras = obtenerSiembras();
}

//######################################################################
/**
 * Gestion de estados
 */
// Función para obtener todos los estados almacenados en localStorage
function obtenerEstados() {
    const estados = JSON.parse(localStorage.getItem(KEY_ESTADO)) || [];
    return estados;
}

// Función para insertar un nuevo estado
function insertarEstado(nombre) {
    const estados = obtenerEstados();
    // Asignar un nuevo ID de estado (basado en el último ID existente)
    const nuevoId = estados.length ? estados[estados.length - 1].id + 1 : 1;
    
    const nuevoEstado = {
        id: nuevoId,
        nombre: nombre
    };
    
    estados.push(nuevoEstado);
    localStorage.setItem(KEY_ESTADO, JSON.stringify(estados));
    
    console.log('Estado insertado correctamente:', nuevoEstado);
}

// Función para obtener un estado por su ID
function obtenerEstadoPorId(id) {
    const estados = obtenerEstados();
    return estados.find(estado => estado.id === id) || null;
}

// Función para asignar un estado a una siembra
function asignarEstadoSiembra(idSiembra, idEstado) {
    // Obtener la lista de siembras y de estados
    const siembras = JSON.parse(localStorage.getItem(KEY_SIEMBRA)) || [];
    const estados = obtenerEstados();
    
    // Buscar siembra por su id
    const siembra = siembras.find(siembra => siembra.id === idSiembra);
    const estado = estados.find(estado => estado.id === idEstado);
    
    // Si ambos existen, asignamos el estado a la siembra
    if (siembra && estado) {
        siembra.estado = estado.nombre;  // Agregamos el estado a la siembra
        localStorage.setItem(KEY_SIEMBRA, JSON.stringify(siembras));
        console.log(`Estado "${estado.nombre}" asignado a la siembra con ID ${idSiembra}`);
        return true
    } else {
        return false
    }
}

// Función para inicializar los estados
function inicializarEstados() {
    const estados = JSON.parse(localStorage.getItem('estados')) || [];

    // Estados iniciales
    const estadosIniciales = [
        { _id: 1, _nombre: 'Arrar' },
        { _id: 2, _nombre: 'Sembrado' },
        { _id: 3, _nombre: 'Abonado' },
        { _id: 4, _nombre: 'Cosechado' },
    ];

    // Si no hay estados en LocalStorage, los guardamos
    if (estados.length === 0) {
        localStorage.setItem('estados', JSON.stringify(estadosIniciales));
        return estados
    } else {
        return []
    }
}



// Mostrar el diálogo con los cultivos
function mostrarDialogo(fecha) {
    console.log(fecha)
    const dialog = document.getElementById('cultivoDialog');
    const dialogDate = document.getElementById('dialogDate');
    const cultivosList = document.getElementById('cultivosList');

    // Filtrar cultivos por la fecha seleccionada
    const cultivosDelDia = cultivos.filter(c => c._fechaSiembra === fecha);

    // Actualizar contenido del diálogo
    dialogDate.textContent = fecha;
    cultivosList.innerHTML = '';
    if (cultivosDelDia.length > 0) {
        cultivosDelDia.forEach(c => {
            const li = document.createElement('li');
            li.textContent = c._nombre;
            cultivosList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No hay cultivos registrados para este día.';
        cultivosList.appendChild(li);
    }

    // Mostrar el diálogo
    dialog.style.display = 'block';
}


// Cerrar el diálogo al hacer clic fuera de él
window.onclick = function (event) {
    const dialog = document.getElementById('cultivoDialog');
    if (event.target === dialog) {
        dialog.style.display = 'none';
    }
};


// Agregar evento al clic en un día
document.getElementById('calendar').addEventListener('click', function (e) {
    const cell = e.target.closest('.toastui-calendar-weekday-grid');
    if (cell) {
      const fecha = cell.dataset.date;
      if (fecha) {
        mostrarDialogo(fecha);
      }
    } else {
        console.log("Sin cell")
    }
    mostrarDialogo();
  });

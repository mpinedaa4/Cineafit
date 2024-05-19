document.getElementById('btnConsultarTodos').addEventListener('click', function() {
    // Realizar una solicitud GET al backend para obtener los datos
    fetch('http://localhost:3000/TodasSedes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        // Manejar los datos recibidos, por ejemplo, llenar la tabla
        llenarTabla(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  
function llenarTabla(data) {
const tablaBody = document.querySelector('table tbody');

// Limpiar cualquier fila existente en la tabla
tablaBody.innerHTML = '';

// Recorrer todos los elementos en el array data
data.forEach(sede => {
    // Crear una fila y agregar las celdas con los datos del sede
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td>${sede.codigo_sede}</td>
        <td>${sede.localidad}</td>
        <td>${sede.direccion_sede}</td>
        <td>${sede.numero_salas}</td>
    `;
    tablaBody.appendChild(nuevaFila);
});
}
document.getElementById('btnConsultar').addEventListener('click', function() {
    // Realizar una solicitud GET al backend para obtener los datos
    const codigo_sede = document.getElementById("codigo_sede").value;
    fetch(`http://localhost:3000/BuscarSede/${codigo_sede}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        // Manejar los datos recibidos, por ejemplo, llenar la tabla
        document.getElementById('codigo_sede').value = data[0].codigo_sede;
        document.getElementById('localidad').value = data[0].localidad;
        document.getElementById('direccion').value = data[0].direccion_sede;
        document.getElementById('numero_salas').value = data[0].numero_salas;
      })
      .catch(error => {
        console.error('Error:', error);
        });
});

document.getElementById('btnIngresar').addEventListener('click', function() {
    // Realizar una solicitud GET al backend para obtener los datos
    const codigo_sede =document.getElementById('codigo_sede').value;
    const localidad = document.getElementById('localidad').value;
    const direccion = document.getElementById('direccion').value;
    const numero_salas = document.getElementById('numero_salas').value;
    fetch('http://localhost:3000/IngresarSede', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            codigo_sede: codigo_sede,
            localidad: localidad,
            direccion: direccion,
            numero_salas: numero_salas
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al insertar los datos');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos insertados:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('btnModificar').addEventListener('click', function() {
    // Realizar una solicitud GET al backend para obtener los datos
    const codigo_sede =document.getElementById('codigo_sede').value;
    const localidad = document.getElementById('localidad').value;
    const direccion = document.getElementById('direccion').value;
    const numero_salas = document.getElementById('numero_salas').value;
    fetch('http://localhost:3000/ModificarSede', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            codigo_sede: codigo_sede,
            localidad: localidad,
            direccion: direccion,
            numero_salas: numero_salas
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al modificar los datos');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos modificados:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('btnEliminar').addEventListener('click', function() {
    // Obtener el codigo de la sede que se va a eliminar
    const codigo_sede = document.getElementById('codigo_sede').value;

    // Configurar la solicitud fetch para enviar la solicitud DELETE al servidor
    fetch(`http://localhost:3000/EliminarSede/${codigo_sede}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar la sede');
        }
        return response.json();
    })
    .then(data => {
        console.log('Sede eliminada:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('btnLimpiar').addEventListener('click', function() {
    document.getElementById('codigo_sede').value = "";
    document.getElementById('localidad').value = "";
    document.getElementById('direccion').value = "";
    document.getElementById('numero_salas').value = "";
});


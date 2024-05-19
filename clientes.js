document.getElementById('btnConsultarTodos').addEventListener('click', function() {
    // Realizar una solicitud GET al backend para obtener los datos
    fetch('http://localhost:3000/TodosClientes')
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
data.forEach(cliente => {
    // Crear una fila y agregar las celdas con los datos del cliente
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td>${cliente.id_cliente}</td>
        <td>${cliente.primer_nombre_cliente}</td>
        <td>${cliente.segundo_nombre_cliente}</td>
        <td>${cliente.primer_apellido_cliente}</td>
        <td>${cliente.segundo_apellido_cliente}</td>
        <td>${cliente.direccion_cliente}</td>
        <td>${cliente.cliente_vip}</td>
        <td>${cliente.correo_electronico}</td>
    `;
    tablaBody.appendChild(nuevaFila);
});
}
document.getElementById('btnConsultar').addEventListener('click', function() {
    // Realizar una solicitud GET al backend para obtener los datos
    const id = document.getElementById("ID").value;
    fetch(`http://localhost:3000/BuscarCliente/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        // Manejar los datos recibidos, por ejemplo, llenar la tabla
        document.getElementById('ID').value = data[0].id_cliente;
        document.getElementById('primer_nombre').value = data[0].primer_nombre_cliente;
        document.getElementById('segundo_nombre').value = data[0].segundo_nombre_cliente;
        document.getElementById('primer_apellido').value = data[0].primer_apellido_cliente;
        document.getElementById('segundo_apellido').value = data[0].segundo_apellido_cliente;
        document.getElementById('direccion').value = data[0].direccion_cliente;
        document.getElementById('cliente_vip').value = data[0].cliente_vip;
        document.getElementById('correo').value = data[0].correo_electronico;
      })
      .catch(error => {
        console.error('Error:', error);
        });
});

document.getElementById('btnIngresar').addEventListener('click', function() {
    // Realizar una solicitud GET al backend para obtener los datos
    const id =document.getElementById('ID').value;
    const primerNombre = document.getElementById('primer_nombre').value;
    const segundoNombre = document.getElementById('segundo_nombre').value;
    const primerApellido = document.getElementById('primer_apellido').value;
    const segundoApellido = document.getElementById('segundo_apellido').value;
    const direccion = document.getElementById('direccion').value;
    const vip = document.getElementById('cliente_vip').value;
    const correo = document.getElementById('correo').value;
    fetch('http://localhost:3000/IngresarCliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            primerNombre: primerNombre,
            segundoNombre: segundoNombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            direccion: direccion,
            vip: vip,
            correo: correo
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
    const id =document.getElementById('ID').value;
    const primerNombre = document.getElementById('primer_nombre').value;
    const segundoNombre = document.getElementById('segundo_nombre').value;
    const primerApellido = document.getElementById('primer_apellido').value;
    const segundoApellido = document.getElementById('segundo_apellido').value;
    const direccion = document.getElementById('direccion').value;
    const vip = document.getElementById('cliente_vip').value;
    const correo = document.getElementById('correo').value;
    fetch('http://localhost:3000/ModificarCliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            primerNombre: primerNombre,
            segundoNombre: segundoNombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            direccion: direccion,
            vip: vip,
            correo: correo
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
    // Obtener el ID del cliente que se va a eliminar
    const id = document.getElementById('ID').value;

    // Configurar la solicitud fetch para enviar la solicitud DELETE al servidor
    fetch(`http://localhost:3000/EliminarCliente/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el cliente');
        }
        return response.json();
    })
    .then(data => {
        console.log('Cliente eliminado:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('btnVIP').addEventListener('click', function() {
    // Realizar una solicitud GET al backend para obtener los datos
    const id = document.getElementById("ID").value;
    fetch(`http://localhost:3000/EsVIP/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        const circle = document.getElementById("part3");
        if (data[0].es_vip == 0){
            circle.style.backgroundColor = "#DB342B";
        }
        else if (data[0].es_vip == 1){
            circle.style.backgroundColor = "#398F2A";
        }
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
        });
});


document.getElementById('btnLimpiar').addEventListener('click', function() {
    document.getElementById('ID').value = "";
    document.getElementById('primer_nombre').value = "";
    document.getElementById('segundo_nombre').value = "";
    document.getElementById('primer_apellido').value = "";
    document.getElementById('segundo_apellido').value = "";
    document.getElementById('direccion').value = "";
    document.getElementById('cliente_vip').value = "";
    document.getElementById('correo').value = "";
    document.getElementById("part3").style.backgroundColor = "#3f3f3f";
});


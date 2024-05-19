document.getElementById('btnConsultarTodos').addEventListener('click', function() {
    // Realizar una solicitud GET al backend para obtener los datos
    fetch('http://localhost:3000/TodosEmpleados')
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
data.forEach(empleado => {
    // Crear una fila y agregar las celdas con los datos del empleado
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td>${empleado.id_empleado}</td>
        <td>${empleado.primer_nombre_empleado}</td>
        <td>${empleado.segundo_nombre_empleado}</td>
        <td>${empleado.primer_apellido_empleado}</td>
        <td>${empleado.segundo_apellido_empleado}</td>
        <td>${empleado.direccion_empleado}</td>
        <td>${empleado.salario}</td>
        <td>${empleado.codigo_sede}</td>
    `;
    tablaBody.appendChild(nuevaFila);
});
}
document.getElementById('btnConsultar').addEventListener('click', function() {
    // Realizar una solicitud GET al backend para obtener los datos
    const id = document.getElementById("ID").value;
    fetch(`http://localhost:3000/BuscarEmpleado/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        // Manejar los datos recibidos, por ejemplo, llenar la tabla
        document.getElementById('ID').value = data[0].id_empleado;
        document.getElementById('primer_nombre').value = data[0].primer_nombre_empleado;
        document.getElementById('segundo_nombre').value = data[0].segundo_nombre_empleado;
        document.getElementById('primer_apellido').value = data[0].primer_apellido_empleado;
        document.getElementById('segundo_apellido').value = data[0].segundo_apellido_empleado;
        document.getElementById('direccion').value = data[0].direccion_empleado;
        document.getElementById('salario').value = data[0].salario;
        document.getElementById('codigo_sede').value = data[0].codigo_sede;
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
    const salario = document.getElementById('salario').value;
    const codigoSede = document.getElementById('codigo_sede').value;
    fetch('http://localhost:3000/IngresarEmpleado', {
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
            salario: salario,
            codigoSede: codigoSede
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
    const salario = document.getElementById('salario').value;
    const codigo_sede = document.getElementById('codigo_sede').value;
    fetch('http://localhost:3000/ModificarEmpleado', {
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
            salario: salario,
            codigo_sede: codigo_sede
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
    // Obtener el ID del empleado que se va a eliminar
    const id = document.getElementById('ID').value;

    // Configurar la solicitud fetch para enviar la solicitud DELETE al servidor
    fetch(`http://localhost:3000/EliminarEmpleado/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el empleado');
        }
        return response.json();
    })
    .then(data => {
        console.log('Empleado eliminado:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('btnSeguridadSocial').addEventListener('click', function() {
    // Obtener el ID del empleado que se va a eliminar
    const id = document.getElementById('ID').value;

    // Configurar la solicitud fetch para enviar la solicitud al servidor
    fetch(`http://localhost:3000/DescontarSS/${id}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en el procedimiento');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('btnMaxSalario').addEventListener('click', function() {
    fetch(`http://localhost:3000/MaxSalario`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en el procedimiento');
        }
        return response.json();
    })
    .then(data => {
        const tablaBody = document.querySelector('table tbody');

        // Limpiar cualquier fila existente en la tabla
        tablaBody.innerHTML = '';

        // Recorrer todos los elementos en el array data
        // Crear una fila y agregar las celdas con los datos del empleado
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>${data[0].mayor_salario}</td>
            <td></td>
        `;
        tablaBody.appendChild(nuevaFila);
        console.log('Datos:', data);
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
    document.getElementById('salario').value = "";
    document.getElementById('codigo_sede').value = "";
});


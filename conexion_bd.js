// node conexion_bd.js

const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cineafit'
});

// Conexión a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos: ', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL exitosa');
});

// Ruta para obtener datos de la base de datos
app.get('/TodosClientes', (req, res) => {
  const sql = 'SELECT * FROM cliente';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error al obtener datos de la base de datos');
      return;
    }
    res.json(result);
  });
});

app.get('/BuscarCliente/:ID', (req, res) => {
    const id = req.params.ID; // Obtener el ID de los parámetros de ruta
    const sql = `SELECT * FROM cliente WHERE id_cliente = ?`; // Consulta SQL con un placeholder para el ID
    connection.query(sql, [id], (err, result) => { // Pasar el ID como un parámetro en el array
      if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        res.status(500).send('Error al obtener datos de la base de datos');
        return;
      }
      res.json(result);
    });
});

app.post('/IngresarCliente', (req, res) => {
    const id = req.body.id;
    const primerNombre = req.body.primerNombre;
    const segundoNombre = req.body.segundoNombre;
    const primerApellido = req.body.primerApellido;
    const segundoApellido = req.body.segundoApellido;
    const direccion = req.body.direccion;
    const vip = req.body.vip;
    const correo = req.body.correo;

    const sql = `INSERT INTO cliente (id_cliente, primer_nombre_cliente, segundo_nombre_cliente, primer_apellido_cliente, segundo_apellido_cliente, 
        direccion_cliente, cliente_vip, correo_electronico) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [id, primerNombre, segundoNombre, primerApellido, segundoApellido, direccion, vip, correo], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error al insertar los datos en la base de datos');
            return;
        }
        res.json({ message: 'Datos insertados correctamente' });
    });
});

app.post('/modificarCliente', (req, res) => {
    const { id, primerNombre, segundoNombre, primerApellido, segundoApellido, direccion, vip, correo } = req.body;

    // Realizar la operación de actualización en la base de datos
    const sql = `UPDATE cliente 
                 SET primer_nombre_cliente=?, 
                     segundo_nombre_cliente=?, 
                     primer_apellido_cliente=?, 
                     segundo_apellido_cliente=?, 
                     direccion_cliente=?, 
                     cliente_vip=?, 
                     correo_electronico=? 
                 WHERE id_cliente=?`;
    
    connection.query(sql, [primerNombre, segundoNombre, primerApellido, segundoApellido, direccion, vip, correo, id], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta: ', err);
            res.status(500).send('Error al modificar los datos en la base de datos');
            return;
        }
        res.json({ message: 'Datos modificados correctamente' });
    });
});

app.delete('/EliminarCliente/:id', (req, res) => {
    const id = req.params.id; // Obtener el ID del cliente a eliminar

    // Realizar la operación de eliminación en la base de datos
    const sql = 'DELETE FROM cliente WHERE id_cliente = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta: ', err);
            res.status(500).send('Error al eliminar el cliente de la base de datos');
            return;
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    });
});

app.get('/EsVIP/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT es_vip(?) AS es_vip`;
    connection.query(sql, [id], (err, result) => {
    if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        res.status(500).send('Error al obtener datos de la base de datos');
        return;
    }
    res.json(result);
    });
});

app.get('/TodosEmpleados', (req, res) => {
    const sql = 'SELECT * FROM empleado';
    connection.query(sql, (err, result) => {
        if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        res.status(500).send('Error al obtener datos de la base de datos');
        return;
        }
        res.json(result);
    });
});
  
app.get('/BuscarEmpleado/:ID', (req, res) => {
    const id = req.params.ID; // Obtener el ID de los parámetros de ruta
    const sql = `SELECT * FROM empleado WHERE id_empleado = ?`; // Consulta SQL con un placeholder para el ID
    connection.query(sql, [id], (err, result) => { // Pasar el ID como un parámetro en el array
    if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        res.status(500).send('Error al obtener datos de la base de datos');
        return;
    }
    res.json(result);
    });
});
  
app.post('/IngresarEmpleado', (req, res) => {
    const id = req.body.id;
    const primerNombre = req.body.primerNombre;
    const segundoNombre = req.body.segundoNombre;
    const primerApellido = req.body.primerApellido;
    const segundoApellido = req.body.segundoApellido;
    const direccion = req.body.direccion;
    const salario = req.body.salario;
    const codigoSede = req.body.codigoSede;

    const sql = `INSERT INTO empleado (id_empleado, primer_nombre_empleado, segundo_nombre_empleado, primer_apellido_empleado, segundo_apellido_empleado, 
        direccion_empleado, salario, codigo_sede) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [id, primerNombre, segundoNombre, primerApellido, segundoApellido, direccion, salario, codigoSede], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error al insertar los datos en la base de datos');
            return;
        }
        res.json({ message: 'Datos insertados correctamente' });
    });
});
  
app.post('/modificarEmpleado', (req, res) => {
    const { id, primerNombre, segundoNombre, primerApellido, segundoApellido, direccion, salario, codigo_sede } = req.body;

    // Realizar la operación de actualización en la base de datos
    const sql = `UPDATE empleado 
                SET primer_nombre_empleado=?, 
                    segundo_nombre_empleado=?, 
                    primer_apellido_empleado=?, 
                    segundo_apellido_empleado=?, 
                    direccion_empleado=?, 
                    salario=?, 
                    codigo_sede=? 
                WHERE id_empleado=?`;
    
    connection.query(sql, [primerNombre, segundoNombre, primerApellido, segundoApellido, direccion, salario, codigo_sede, id], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta: ', err);
            res.status(500).send('Error al modificar los datos en la base de datos');
            return;
        }
        res.json({ message: 'Datos modificados correctamente' });
    });
});
  
app.delete('/EliminarEmpleado/:id', (req, res) => {
    const id = req.params.id; // Obtener el ID del empleado a eliminar

    // Realizar la operación de eliminación en la base de datos
    const sql = 'DELETE FROM empleado WHERE id_empleado = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta: ', err);
            res.status(500).send('Error al eliminar el empleado de la base de datos');
            return;
        }
        res.json({ message: 'Empleado eliminado correctamente' });
    });
});

app.post('/DescontarSS/:id', (req, res) => {
    const id = req.params.id; // Obtener el ID del empleado a eliminar

    // Realizar la operación de eliminación en la base de datos
    const sql = 'CALL seguridad_social(?)';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta: ', err);
            res.status(500).send('Error al ejecutar el procedimiento');
            return;
        }
        res.json({ message: 'Procedimiento exitoso' });
    });
});

app.get('/MaxSalario', (req, res) => {
    const sql = `SELECT mayor_salario() AS mayor_salario`;
    connection.query(sql, (err, result) => {
    if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        res.status(500).send('Error al obtener datos de la base de datos');
        return;
    }
    res.json(result);
    });
});

app.get('/TodasSedes', (req, res) => {
const sql = 'SELECT * FROM sede';
connection.query(sql, (err, result) => {
    if (err) {
    console.error('Error al ejecutar la consulta: ', err);
    res.status(500).send('Error al obtener datos de la base de datos');
    return;
    }
    res.json(result);
});
});
  
app.get('/BuscarSede/:codigo_sede', (req, res) => {
    const codigo_sede = req.params.codigo_sede; // Obtener el ID de los parámetros de ruta
    const sql = `SELECT * FROM sede WHERE codigo_sede = ?`; // Consulta SQL con un placeholder para el ID
    connection.query(sql, [codigo_sede], (err, result) => { // Pasar el ID como un parámetro en el array
    if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        res.status(500).send('Error al obtener datos de la base de datos');
        return;
    }
    res.json(result);
    });
});
  
app.post('/IngresarSede', (req, res) => {
    const codigo_sede = req.body.codigo_sede;
    const localidad = req.body.localidad;
    const direccion = req.body.direccion;
    const numero_salas = req.body.numero_salas;

    const sql = `INSERT INTO sede (codigo_sede, localidad, direccion_sede, numero_salas) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [codigo_sede, localidad, direccion, numero_salas], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error al insertar los datos en la base de datos');
            return;
        }
        res.json({ message: 'Datos insertados correctamente' });
    });
});
  
app.post('/modificarSede', (req, res) => {
    const { codigo_sede, localidad, direccion, numero_salas } = req.body;

    // Realizar la operación de actualización en la base de datos
    const sql = `UPDATE sede 
                SET localidad=?, 
                    direccion_sede=?, 
                    numero_salas=? 
                WHERE codigo_sede=?`;
    
    connection.query(sql, [localidad, direccion, numero_salas, codigo_sede], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta: ', err);
            res.status(500).send('Error al modificar los datos en la base de datos');
            return;
        }
        res.json({ message: 'Datos modificados correctamente' });
    });
});
  
  app.delete('/EliminarSede/:codigo_sede', (req, res) => {
      const codigo_sede = req.params.codigo_sede; // Obtener el código de la sede a eliminar
  
      // Realizar la operación de eliminación en la base de datos
      const sql = 'DELETE FROM sede WHERE codigo_sede = ?';
      connection.query(sql, [codigo_sede], (err, result) => {
          if (err) {
              console.error('Error al ejecutar la consulta: ', err);
              res.status(500).send('Error al eliminar la sede de la base de datos');
              return;
          }
          res.json({ message: 'Sede eliminada correctamente' });
      });
  });

app.listen(port, () => {
    console.log(`Servidor Node.js iniciado en el puerto ${port}`);
  });

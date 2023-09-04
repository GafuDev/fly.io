const Usuario = require('../models/usuariomodel');
const { generateHash, verificarContrasena } = require('../middlewares/secure');


const usuarioController = {
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },
 
  login: async (req, res) => {

    const { usuario, contrasena } = req.body[0]
    const listarTodoUsuario = await Usuario.getAll();
    const usuarioexiste = listarTodoUsuario.find(ele => ele.username == usuario)
    
    if (!usuario || !contrasena) {
      return res.status(200).json({ status: false, mensaje: "Usuario o Contraseña Incorrecta" });
    }
    
    if (usuarioexiste) {
      const contrasenaCorrecta = await verificarContrasena(contrasena, usuarioexiste.contrasena);
      
      if (contrasenaCorrecta) {
        return res.status(200).json({ status: true, datos: { usuario: usuarioexiste.nombre, username: usuarioexiste.username, rol: usuarioexiste.idRol, id: usuarioexiste.idUsuario} });
      }
      
      else {
        return res.status(200).json({ status: false, mensaje: "Contraseña Incorrecta" });
      }

      
    } else {
      return res.status(200).json({ status: false, mensaje: "Usuario no existe" });
    }
  },
  
  agregarUsuario: async (req, res) => {
    try {
      const usuarios = req.body;
      for (const usuario of usuarios) {
        const hashedPassword = await generateHash(usuario.contrasena);
        usuario.contrasena = hashedPassword;
      }
      const insertedId = await Usuario.create(usuarios);
      res.json({ message: 'Usuario agregado', id: insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar usuario' });
    }
  },

  obtenerPorID: async (req, res) => {
    const id = req.params.id;

    try {
      const usuario = await Usuario.getById(id);

      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario por ID' });
    }
  },

  editarUsuario: async (req, res) => {
    const idUsuario = req.params.id;
    const userData = req.body;

    try {
      const updatedUser = await Usuario.update(idUsuario, userData);
      if (updatedUser.affectedRows > 0) {
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  },

  eliminarUsuario: async (req, res) => {
    const id = req.params.id;
    try {
      await Usuario.delete(id);
      res.json({ message: 'Usuario eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  },
};

module.exports = usuarioController;
const Usuario = require('../models/usuario');
const Rol = require('../models/rol');

const esRolValido = async( rol = '' ) => { // Realizar validacion manual
    const existeRol = await Rol.findOne({rol});
    if(!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`); // Se atrapa el error
    }
}

const emailExiste = async( correo = '' ) => {
    // Verificar si el correo existe (el modelo ya verifica, pero haciendolo desde aqui evitamos que se mande todo el body de nuevo a mongo)
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ) {
        throw new Error(`El correo ${correo} ya ha sido utilizado`);
        // return res.status(400).json({
        //     msg: 'El correo ya está registrado'
        // });
    }
}

const existeUsuarioPorId = async( id = '' ) => {
    // Verificar si el id de mongo existe
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}
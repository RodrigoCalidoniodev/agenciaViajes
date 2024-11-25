import {Testimoniales} from '../models/Testimoniales.js';

const guardarTestimonial = async (request, response) => {
    
    // Validar el formulario
    const {nombre, correo, mensaje} = request.body;

    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacío'});
    }
    if(correo.trim() === '') {
        errores.push({mensaje: 'El correo está vacío'});
    }
    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje está vacío'});
    }

    if(errores.length > 0) {

        // Consultar testimoniales existentes
        const testimoniales = await Testimoniales.findAll();

        // Mostrar la vista con errores
        response.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }
    else {
        // Almacenarlo en la base de datos
        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            });

            response.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}
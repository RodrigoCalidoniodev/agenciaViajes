import {Viaje} from '../models/Viajes.js';
import { Testimoniales } from '../models/Testimoniales.js';

const paginaInicio = async (request, response) => {
    // request: Lo que enviamos, response: Lo que express nos responde
    // .render: se utiliza para mostrar una vista.

    // Consulta 3 viajes del modelo Viaje
    try {

        // Hacer múltiples consultas a la vez (course form)
        //const promiseDB = [];

        /*promiseDB.push(Viaje.findAll({ limit: 3 }));
        promiseDB.push(Testimoniales.findAll({ limit: 3 }));
        
        const resultado = await Promise.all( promiseDB );*/

        // another form
        const [viajes, testimoniales] = await Promise.all(
            [Viaje.findAll( {limit: 3} ),
             Testimoniales.findAll( {limit: 3} )
            ]);

        response.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            //viajes: resultado[0],
            //testimoniales: resultado[1]
            viajes,
            testimoniales

        });
    } catch (error) {
        console.log(error);
    }

    
}

const paginaNosotros = (request, response) => {
    response.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (request, response) => {
    // Traer la info del modelo y consultar la bd
    const viajes = await Viaje.findAll();

    response.render('viajes', {
        pagina: 'Próximos viajes',
        viajes
        
    });
}

const paginaTestimoniales = async (request, response) => {

    try {

        const testimoniales = await Testimoniales.findAll();

        response.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        
    }
    
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (request, response) => {
    
    const { slug } = request.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });
        response.render('viaje', {
            pagina: 'Informacion viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}
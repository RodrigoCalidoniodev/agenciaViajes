import express from 'express';
import { paginaInicio, 
        paginaNosotros, 
        paginaViajes, 
        paginaTestimoniales, 
        paginaDetalleViaje } 
from '../controllers/paginasController.js';
import { guardarTestimonial } from '../controllers/testimonialesController.js';

const router = express.Router(); // Misma instancia de express, pero utilizando su Router (no usar app del otro archivo ya que solo debemos de tener una instancia);

// El controlador debe de ser el encargado de dictaminar que información se va a mostrar
router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetalleViaje); // Usamos un comodín con :

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

export default router;
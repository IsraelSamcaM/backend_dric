import { Router } from "express";
import {createMunicipio,
        deleteMunicipio,
        getMunicipio,
        getMunicipios,
        updateMunicipio} from '../controllers/municipios.controller.js';

const router = Router();

router.get('/', getMunicipios);
router.get('/:id_municipio', getMunicipio);

router.post('/', createMunicipio);
router.put('/:id_municipio', updateMunicipio);
router.delete('/:id_municipio', deleteMunicipio);

export default router;

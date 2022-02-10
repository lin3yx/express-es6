import { Router } from 'express';
import { welcome, getAll } from '../controllers/index.controller';

const path = '/test';
const router = Router();

router.get(path, welcome);
router.get(`${path}/all`, getAll);

export default router;

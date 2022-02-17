import { Router } from 'express';
import { getPosts, getAddress } from '../controllers/index.controller';

const path = '/test';
const router = Router();

router.get(path, getPosts);
router.get(`${path}/address`, getAddress);

export default router;

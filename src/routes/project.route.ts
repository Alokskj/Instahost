import express from 'express';
import { projectCreateRules } from '../validators/project.validator';
import validate from '../middlewares/validation.middleware';
import { createProject } from '../controllers/project.controllers';

const router = express.Router();

router.post('/create', projectCreateRules, validate, createProject);

export default router;

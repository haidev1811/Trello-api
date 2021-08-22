import express from 'express';
import { HttpStatusCode } from '*/utilities/constants';
import { BoardController } from '*/controllers/board.controller';
import { BoardValidation } from '*/validations/board.validation';

const router = express.Router();

router.route('/')
    //.get((req, res) => console.log('GET'))
    .post(BoardValidation.createNew, BoardController.createNew)

export const boardRoutes = router;
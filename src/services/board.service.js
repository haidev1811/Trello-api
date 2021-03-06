import { BoardModel } from "*/models/board.model";
import { cloneDeep } from "lodash";

const createNew = async (data) => {
    try {
        //transaction mongodb
        const result = await BoardModel.createNew(data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getFullBoard = async (boardId) => {
    try {
        const board = await BoardModel.getFullBoard(boardId);
        if (!board || !board.columns) {
            throw new Error('Board not found!');
        }

        const transformBoard = cloneDeep(board);
        //filter deleted columns
        transformBoard.columns = transformBoard.columns.filter(column => !column._destroy);

        //add card to each column
        transformBoard.columns.forEach(column => {
            column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
        });

        //sort column by columnOrder, sort card by cardOrder, this step will apass to frontend DEV

        //remove cards data from boards
        delete transformBoard.cards;

        return transformBoard;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const upadateData = {
            ...data,
            updatedAt: Date.now()
        }
        if (upadateData._id) delete upadateData._id;
        if (upadateData.columns) delete upadateData.columns;

        const updatedBoard = await BoardModel.update(id, upadateData);

        return updatedBoard;
    } catch (error) {
        throw new Error(error);
    }
};

export const BoardService = {
    createNew,
    getFullBoard,
    update
};
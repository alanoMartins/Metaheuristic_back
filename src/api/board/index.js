import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Board, { schema } from './model'

const router = new Router()
const { height, width, pierces } = schema.tree

/**
 * @api {post} /boards Create board
 * @apiName CreateBoard
 * @apiGroup Board
 * @apiParam height Board's height.
 * @apiParam width Board's width.
 * @apiParam pierces Board's pierces.
 * @apiSuccess {Object} board Board's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board not found.
 */
router.post('/',  body({ height, width, pierces }), create)

/**
 * @api {get} /boards Retrieve boards
 * @apiName RetrieveBoards
 * @apiGroup Board
 * @apiUse listParams
 * @apiSuccess {Object[]} boards List of boards.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(), index)

/**
 * @api {get} /boards/:id Retrieve board
 * @apiName RetrieveBoard
 * @apiGroup Board
 * @apiSuccess {Object} board Board's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board not found.
 */
router.get('/:id', show)

/**
 * @api {put} /boards/:id Update board
 * @apiName UpdateBoard
 * @apiGroup Board
 * @apiParam height Board's height.
 * @apiParam width Board's width.
 * @apiParam pierces Board's pierces.
 * @apiSuccess {Object} board Board's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board not found.
 */
router.put('/:id', body({ height, width, pierces }), update)

/**
 * @api {delete} /boards/:id Delete board
 * @apiName DeleteBoard
 * @apiGroup Board
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Board not found.
 */
router.delete('/:id', destroy)

export default router

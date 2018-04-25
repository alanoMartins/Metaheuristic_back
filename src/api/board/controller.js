import { success, notFound } from '../../services/response/'
import { Board } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Board.create(body)
    .then((board) => board.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Board.find(query, select, cursor)
    .then((boards) => boards.map((board) => board.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Board.findById(params.id)
    .then(notFound(res))
    .then((board) => board ? board.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Board.findById(params.id)
    .then(notFound(res))
    .then((board) => board ? Object.assign(board, body).save() : null)
    .then((board) => board ? board.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Board.findById(params.id)
    .then(notFound(res))
    .then((board) => board ? board.remove() : null)
    .then(success(res, 204))
    .catch(next)

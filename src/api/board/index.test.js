import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Board } from '.'

const app = () => express(apiRoot, routes)

let board

beforeEach(async () => {
  board = await Board.create({})
})

test('POST /boards 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ height: 'test', width: 'test', pierces: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.height).toEqual('test')
  expect(body.width).toEqual('test')
  expect(body.pierces).toEqual('test')
})

test('GET /boards 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /boards/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${board.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(board.id)
})

test('GET /boards/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /boards/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${board.id}`)
    .send({ height: 'test', width: 'test', pierces: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(board.id)
  expect(body.height).toEqual('test')
  expect(body.width).toEqual('test')
  expect(body.pierces).toEqual('test')
})

test('PUT /boards/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ height: 'test', width: 'test', pierces: 'test' })
  expect(status).toBe(404)
})

test('DELETE /boards/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${board.id}`)
  expect(status).toBe(204)
})

test('DELETE /boards/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

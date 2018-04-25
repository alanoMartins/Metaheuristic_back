import { Board } from '.'

let board

beforeEach(async () => {
  board = await Board.create({ height: 'test', width: 'test', pierces: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = board.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(board.id)
    expect(view.height).toBe(board.height)
    expect(view.width).toBe(board.width)
    expect(view.pierces).toBe(board.pierces)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = board.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(board.id)
    expect(view.height).toBe(board.height)
    expect(view.width).toBe(board.width)
    expect(view.pierces).toBe(board.pierces)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

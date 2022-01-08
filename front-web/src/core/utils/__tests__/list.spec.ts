import { generateList } from '../list'

describe('generateList()', () => {
  it('should make a list within an array', () => {
    let items = generateList(5)

    expect(items).toStrictEqual([0, 1, 2, 3, 4])

    items = generateList(2)

    expect(items).toStrictEqual([0, 1])
  })
})

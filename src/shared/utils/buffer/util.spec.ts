import { generateRandomBuffer } from "./util"

describe("Buffer util tests", () => {
  it("should generate a buffer with a predetermined length", () => {
    const length = Math.floor(Math.random() * 10)
    const buffer = generateRandomBuffer(length)
    expect(buffer.byteLength).toBe(length)
  })

  it("should generate a buffer with a random length", () => {
    const buffer1 = generateRandomBuffer()
    const buffer2 = generateRandomBuffer()
    expect(buffer1.length).not.toBe(buffer2.length)
  })

  it("should generate a random buffer", () => {
    const buffer1 = generateRandomBuffer()
    const buffer2 = generateRandomBuffer()
    expect(buffer1).not.toEqual(buffer2)
  })
})

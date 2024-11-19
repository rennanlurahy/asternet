import { generateRandomBuffer } from "@/shared/utils/buffer/util"
import { I048010DataItem } from "./value-object.010"
import { InvalidLength } from "./value-object.error"

describe("I048/010 Data Item tests", () => {
  let buffer: Buffer
  let randomSac: number
  let randomSic: number

  beforeEach(() => {
    buffer = generateRandomBuffer(2)
    randomSac = Math.floor(Math.random() * 256)
    randomSic = Math.floor(Math.random() * 256)
  })

  it("should decode sac", () => {
    buffer.writeUInt8(randomSac, 0)
    const di = I048010DataItem.fromBuffer(buffer)
    expect(di.sac).toBe(randomSac)
  })

  it("should decode sic", () => {
    buffer.writeUInt8(randomSic, 1)
    const di = I048010DataItem.fromBuffer(buffer)
    expect(di.sic).toBe(randomSic)
  })

  it("should throw an error when buffer length is more than 2 bytes", () => {
    const wrongBuffer = Buffer.concat([buffer, Buffer.alloc(1)])
    const di = () => I048010DataItem.fromBuffer(wrongBuffer)
    expect(di).toThrow(InvalidLength)
  })
})

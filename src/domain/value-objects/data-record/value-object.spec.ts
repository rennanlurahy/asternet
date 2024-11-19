import { Cat048DataRecord } from "./value-object"
import { IncompleteMessage } from "./value-object.error"

describe("Cat048 Data Record value object tests", () => {
  it("should throw an error when 'Data Record' is incomplete", () => {
    const buffer = Buffer.alloc(1)
    const dr = () => Cat048DataRecord.fromBuffer(buffer)
    expect(dr).toThrow(IncompleteMessage)
  })
})

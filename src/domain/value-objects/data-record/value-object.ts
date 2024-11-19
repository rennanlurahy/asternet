import { ValueObject } from "@/domain/shared/abstractions/value-object"
import { Props } from "./value-object.protocol"
import { IncompleteMessage } from "./value-object.error"

export class Cat048DataRecord extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  static fromBuffer(buffer: Buffer): Cat048DataRecord {
    if (buffer.length < 2) {
      throw new IncompleteMessage(
        "The message does not have all required fields.",
      )
    }
    const fields = new Map()
    return new Cat048DataRecord({ fields })
  }
}

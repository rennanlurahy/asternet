import { I048010Props } from "./value-object.protocol"
import { InvalidLength } from "./value-object.error"
import { DataItem } from "./value-object"

export class I048010DataItem extends DataItem<I048010Props> {
  private constructor(props: I048010Props) {
    super(props)
  }

  static fromBuffer(buffer: Buffer): I048010DataItem {
    const sac = buffer.readUInt8(0)
    const sic = buffer.readUInt8(1)
    if (buffer.length !== 2) {
      throw new InvalidLength("Data Item I048/010 must be 2 bytes")
    }
    return new I048010DataItem({ type: "010", sac, sic })
  }

  public get sac(): number {
    return this.props.sac
  }

  public get sic(): number {
    return this.props.sic
  }
}

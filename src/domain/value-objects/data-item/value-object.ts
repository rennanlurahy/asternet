import { ValueObject } from "@/domain/shared/abstractions/value-object"
import { BaseProps } from "./value-object.protocol"

export abstract class DataItem<P extends BaseProps> extends ValueObject<P> {
  protected constructor(props: P) {
    super(props)
  }

  public get type(): string {
    return this.props.type
  }
}

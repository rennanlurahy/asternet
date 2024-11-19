export abstract class ValueObject<Props extends Record<any, any>> {
  protected readonly props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  public isEqualTo(other: unknown): boolean {
    if (!(other instanceof ValueObject)) {
      return false
    }
    if (other.constructor.name !== this.constructor.name) {
      return false
    }
    for (const key of Object.keys(this.props)) {
      const thisValue = this.props[key]
      const otherValue = other.props[key]
      if (thisValue instanceof Date && otherValue instanceof Date) {
        if (thisValue.getTime() !== otherValue.getTime()) {
          return false
        }
      } else if (Array.isArray(thisValue) && Array.isArray(otherValue)) {
        if (thisValue.length !== otherValue.length) {
          return false
        }
        for (let i = 0; i < thisValue.length; i++) {
          if (!this.deepEqual(thisValue[i], otherValue[i])) {
            return false
          }
        }
      } else if (
        typeof thisValue === "object" &&
        thisValue !== null &&
        typeof otherValue === "object" &&
        otherValue !== null
      ) {
        if (!this.deepEqual(thisValue, otherValue)) {
          return false
        }
      } else if (thisValue !== otherValue) {
        return false
      }
    }
    return true
  }

  private deepEqual(a: any, b: any): boolean {
    if (a === b) return true
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false
      for (let i = 0; i < a.length; i++) {
        if (!this.deepEqual(a[i], b[i])) {
          return false
        }
      }
      return true
    }
    if (
      typeof a === "object" &&
      a !== null &&
      typeof b === "object" &&
      b !== null
    ) {
      const keysA = Object.keys(a)
      const keysB = Object.keys(b)
      if (keysA.length !== keysB.length) return false
      for (const key of keysA) {
        if (!keysB.includes(key)) return false
        if (!this.deepEqual(a[key], b[key])) {
          return false
        }
      }
      return true
    }
    return false
  }

  public clone(props?: Partial<Props>): this {
    const instance = Reflect.getPrototypeOf(this) as object
    const clonedProps = this.deepClone(this.props)
    if (props != null) {
      Object.keys(props).forEach((key) => {
        if (key in clonedProps) {
          clonedProps[key] = props[key]
        }
      })
    }
    return Reflect.construct(instance.constructor, [clonedProps])
  }

  private deepClone(props: Record<string, unknown>): Record<string, unknown> {
    const container: Record<string, unknown> = {}
    for (const [propKey, propValue] of Object.entries(props)) {
      if (propValue instanceof Date) {
        container[propKey] = new Date(propValue)
      } else if (propValue instanceof ValueObject) {
        container[propKey] = propValue.clone()
      } else if (Array.isArray(propValue)) {
        container[propKey] = propValue.map((item) =>
          typeof item === "object" && item != null
            ? this.deepClone(item)
            : item,
        )
      } else if (propValue instanceof Map) {
        container[propKey] = new Map(
          Array.from(propValue.entries()).map(([key, value]) => [
            key,
            typeof value === "object" && value != null
              ? this.deepClone(value)
              : value,
          ]),
        )
      } else if (propValue instanceof Set) {
        container[propKey] = new Set(
          Array.from(propValue).map((item) =>
            typeof item === "object" && item != null
              ? this.deepClone(item)
              : item,
          ),
        )
      } else if (typeof propValue === "object" && propValue != null) {
        container[propKey] = this.deepClone(propValue as Record<any, any>)
      } else {
        container[propKey] = propValue
      }
    }
    return container
  }
}

import { ValueObject } from "."

class TestValueObject1<
  Props extends Record<string, unknown> = Record<string, unknown>,
> extends ValueObject<Props> {
  constructor(props: Props) {
    super(props)
  }
}

class TestValueObject2<
  Props extends Record<string, unknown>,
> extends ValueObject<Props> {
  constructor(props: Props) {
    super(props)
  }
}

describe("Testing the abstract class 'ValueObject'", () => {
  it("should return true for identical objects", () => {
    const obj1 = new TestValueObject1({ name: "John", age: 30 })
    const obj2 = new TestValueObject1({ name: "John", age: 30 })
    expect(obj1.isEqualTo(obj2)).toBe(true)
  })

  it("should return false for objects with different class names", () => {
    const obj1 = new TestValueObject1({ name: "John", age: 30 })
    const obj2 = new TestValueObject2({ name: "John", age: 30 })
    expect(obj1.isEqualTo(obj2)).toBe(false)
  })

  it("should return false for objects with different properties", () => {
    const obj1 = new TestValueObject1({ name: "John", age: 30 })
    const obj2 = new TestValueObject1({ name: "John", age: 31 })
    expect(obj1.isEqualTo(obj2)).toBe(false)
  })

  it("should return false for object of objects with different lengths", () => {
    const obj1 = new TestValueObject1({
      name: "John",
      age: { month: 2, year: 1993 },
    })
    const obj2 = new TestValueObject1({ name: "John", age: { year: 1993 } })
    expect(obj1.isEqualTo(obj2)).toBe(false)
  })

  it("should return false for object of objects with different properties", () => {
    const obj1 = new TestValueObject1({
      name: "John",
      age: { month: 2, year: 1993 },
    })
    const obj2 = new TestValueObject1({
      name: "John",
      age: { day: 2, year: 1993 },
    })
    expect(obj1.isEqualTo(obj2)).toBe(false)
  })

  it("should return false when comparing to a non-ValueObject", () => {
    const obj1 = new TestValueObject1({ name: "John", age: 30 })
    expect(obj1.isEqualTo({ name: "John", age: 30 })).toBe(false)
  })

  it("should return true when comparing different Date instances with same values", () => {
    const obj1 = new TestValueObject1({
      name: "John",
      age: new Date(2020, 1, 1),
    })
    const obj2 = new TestValueObject1({
      name: "John",
      age: new Date(2020, 1, 1),
    })
    expect(obj1.isEqualTo(obj2)).toBe(true)
  })

  it("should return false when comparing different Date instances objects with different values", () => {
    const obj1 = new TestValueObject1({
      name: "John",
      age: new Date(2020, 1, 1),
    })
    const obj2 = new TestValueObject1({
      name: "John",
      age: new Date(2020, 1, 2),
    })
    expect(obj1.isEqualTo(obj2)).toBe(false)
  })

  it("should return false for arrays with different lengths", () => {
    const obj1 = new TestValueObject1({ name: "John", age: [30, 40] })
    const obj2 = new TestValueObject1({ name: "John", age: [30] })
    expect(obj1.isEqualTo(obj2)).toBe(false)
  })

  it("should return true for arrays with the same values", () => {
    const obj1 = new TestValueObject1({ name: "John", age: [30, 40] })
    const obj2 = new TestValueObject1({ name: "John", age: [30, 40] })
    expect(obj1.isEqualTo(obj2)).toBe(true)
  })

  it("should return false for arrays with different values", () => {
    const obj1 = new TestValueObject1({ name: "John", age: [30, 40] })
    const obj2 = new TestValueObject1({ name: "John", age: [30, 41] })
    expect(obj1.isEqualTo(obj2)).toBe(false)
  })

  it("should return false for arrays of arrays with different values", () => {
    const obj1 = new TestValueObject1({
      name: "John",
      age: [
        [20, 30],
        [20, 30],
      ],
    })
    const obj2 = new TestValueObject1({
      name: "John",
      age: [
        [20, 30],
        [20, 31],
      ],
    })
    expect(obj1.isEqualTo(obj2)).toBe(false)
  })

  it("should return false for arrays of arrays with different lengths", () => {
    const obj1 = new TestValueObject1({
      name: "John",
      age: [
        [20, 30],
        [20, 30],
      ],
    })
    const obj2 = new TestValueObject1({
      name: "John",
      age: [[20, 30], [20]],
    })
    expect(obj1.isEqualTo(obj2)).toBe(false)
  })

  it("should return false for objects with different values", () => {
    const obj1 = new TestValueObject1({ name: "John", age: { num: 20 } })
    const obj2 = new TestValueObject1({ name: "John", age: { num: 21 } })
    expect(obj1.isEqualTo(obj2)).toBe(false)
  })

  it("should clone an object and preserve the same values", () => {
    const obj1 = new TestValueObject1({ name: "John", age: 30 })
    const obj2 = obj1.clone()
    expect(obj1.isEqualTo(obj2)).toBe(true)
  })

  it("should create a new instance with modified properties when passed partial props", () => {
    const obj1 = new TestValueObject1({ name: "John", age: 30 })
    const obj2 = obj1.clone({ age: 31 })
    expect(obj1.isEqualTo(obj2)).toBe(false)
    expect(
      obj2.isEqualTo(new TestValueObject1({ name: "John", age: 31 })),
    ).toBe(true)
  })

  it("should deeply clone nested objects", () => {
    class Nested extends ValueObject<{ details: { street: string } }> {
      constructor(props: { details: { street: string } }) {
        super(props)
      }
    }
    const obj1 = new Nested({
      details: { street: "Main St" },
    })
    const obj2 = obj1.clone()
    expect(obj1.isEqualTo(obj2)).toBe(true)
    expect(obj1["props"].details).not.toBe(obj2["props"].details)
  })

  it("should deeply clone nested ValueObject objects", () => {
    const obj1 = new TestValueObject1({
      name: "John",
      age: new TestValueObject1({ name: "John", age: 31 }),
    })
    const obj2 = obj1.clone()
    expect(obj1.isEqualTo(obj2)).toBe(true)
    expect(obj1["props"].age).not.toBe(obj2["props"].age)
  })

  it("should deep clone Date objects", () => {
    const obj1 = new TestValueObject1({
      name: "John",
      age: new Date(2020, 1, 1),
    })
    const obj2 = obj1.clone()
    expect(obj1.isEqualTo(obj2)).toBe(true)
    expect(obj1["props"].age).not.toBe(obj2["props"].age)
  })

  it("should deep clone Maps", () => {
    const map = new Map<string, string>([["key1", "value1"]])
    const obj1 = new TestValueObject1({ name: "John", age: map })
    const obj2 = obj1.clone()
    expect(obj1.isEqualTo(obj2)).toBe(true)
    expect(obj1["props"].age).not.toBe(obj2["props"].age)
  })

  it("should deep clone Maps of objects", () => {
    const map = new Map<string, Record<string, number>>([["key1", { num: 2 }]])
    const obj1 = new TestValueObject1({ name: "John", age: map })
    const obj2 = obj1.clone()
    expect(obj1.isEqualTo(obj2)).toBe(true)
    expect(obj1["props"].age).not.toBe(obj2["props"].age)
  })

  it("should deep clone Sets of objects", () => {
    const set = new Set([1, 2, 3])
    const obj1 = new TestValueObject1({ name: "John", age: set })
    const obj2 = obj1.clone()
    expect(obj1.isEqualTo(obj2)).toBe(true)
    expect(obj1["props"].age).not.toBe(obj2["props"].age)
  })

  it("should deep clone Sets", () => {
    const set = new Set([1, 2, { num: 2 }])
    const obj1 = new TestValueObject1({ name: "John", age: set })
    const obj2 = obj1.clone()
    expect(obj1.isEqualTo(obj2)).toBe(true)
    expect(obj1["props"].age).not.toBe(obj2["props"].age)
  })

  it("should deep clone objects", () => {
    const obj1 = new TestValueObject1({
      name: "John",
      age: { nested: "value" },
    })
    const obj2 = obj1.clone()
    expect(obj1.isEqualTo(obj2)).toBe(true)
    expect(obj1["props"].age).not.toBe(obj2["props"].age)
  })

  it("should deep clone arrays", () => {
    const obj1 = new TestValueObject1({
      name: "John",
      age: [20, [20]],
    })
    const obj2 = obj1.clone()
    expect(obj1.isEqualTo(obj2)).toBe(true)
    expect(obj1["props"].age).not.toBe(obj2["props"].age)
  })
})

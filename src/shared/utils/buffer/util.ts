export function generateRandomBuffer(length?: number) {
  const byteLength = length ?? Math.floor(Math.random() * 256) + 1
  const buffer: Buffer = Buffer.alloc(byteLength)
  for (let i = 0; i < byteLength; i++) {
    buffer[i] = Math.floor(Math.random() * 256)
  }
  return buffer
}

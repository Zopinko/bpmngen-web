import { timingSafeEqual } from "node:crypto";

function toBuffer(value: string): Buffer {
  return Buffer.from(value, "utf8");
}

export function safeEqual(left: string, right: string): boolean {
  const leftBuffer = toBuffer(left);
  const rightBuffer = toBuffer(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

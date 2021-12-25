/**
 * 生成唯一值
 * @returns
 */
export function uuid(): string {
  const blob = URL.createObjectURL(new Blob());
  const uri = new URL(blob.toString());
  URL.revokeObjectURL(blob);
  return uri.hash;
}

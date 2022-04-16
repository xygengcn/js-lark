/**
 * 生成唯一值
 * @returns
 */
export function uuid(): string {
  const blob = URL.createObjectURL(new Blob());
  const blobArr = blob.toString().split("/");
  URL.revokeObjectURL(blob);
  return (
    (blobArr?.length && blobArr[blobArr.length - 1]) ||
    window.btoa(new Date().getTime().toString())
  );
}

// eslint-disable-next-line require-jsdoc
export function isInstanceOf<T>(object: any): object is T {
  console.log('member' in object, object);
  return 'member' in object;
}

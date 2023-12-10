export type MethodsFrom<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: (...args: any[]) => any;
};

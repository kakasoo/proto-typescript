export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <P>() => P extends Y ? 1 : 2 ? true : false;

export type Merge<F, S> = {
  [K in keyof (F & S)]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never;
};

export type ToInterface<T> = {
  [key in keyof T]: T[key];
};

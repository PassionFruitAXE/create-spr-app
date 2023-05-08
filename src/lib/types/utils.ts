export type GetArrayValueType<T> = T extends Array<infer Value> ? Value : never;

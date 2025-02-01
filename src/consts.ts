export const COMBINATION_STORAGE_KEY = 'combinations'
export const CONSTANTS_STORAGE_KEY = 'constants'
export const APARTMENTS_STORAGE_KEY = 'apartments'
export const CARS_STORAGE_KEY = 'cars'

// number sorter
export const numberSort = (a: number, b: number) => a - b
// string sorter
export const stringSort = (a: string, b: string) => a.localeCompare(b)
// boolean sorter
export const booleanSort = (a: boolean, b: boolean) =>
  a === b ? 0 : a ? 1 : -1

export enum SortType {
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN'
}
export enum RenderCustomType {
  TEXT = 'TEXT',
  LINK = 'LINK',
  CHECKBOX = 'CHECKBOX',
  NUMBER = 'NUMBER',
  DELETE = 'DELETE'
}

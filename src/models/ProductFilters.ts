export interface IProductFilter {
  code: string;
  displayName: string;
  type: string;
}

export interface IProductFilterAdd {
  key: string;
  label: string;
  selected: boolean;
}

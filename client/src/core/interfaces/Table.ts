export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  centered?: boolean
  width?: string
  minWidth?: string
  formatter?: (value: any) => string
}

export interface TableRow {
  [key: string]: any
}

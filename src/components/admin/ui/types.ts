// /components/date-range/types.ts
// Tipos de datos utilizados en el selector de rango de fechas
export interface DateRange {
    start: Date;
    end: Date;
  }
  
  export type CompareType = 'none' | 'previous_period' | 'previous_year';
  
  export interface PresetOption {
    label: string;
    range: DateRange;
  }
  
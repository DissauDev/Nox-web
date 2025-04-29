// /components/date-range/utils.ts
import { DateRange, PresetOption } from './types';

/**
 * Compara si dos rangos de fechas representan exactamente los mismos días.
 */
export function isSameRange(range1: DateRange, range2: DateRange): boolean {
  const sameStart = range1.start.getFullYear() === range2.start.getFullYear() &&
                   range1.start.getMonth() === range2.start.getMonth() &&
                   range1.start.getDate() === range2.start.getDate();
  const sameEnd = range1.end.getFullYear() === range2.end.getFullYear() &&
                 range1.end.getMonth() === range2.end.getMonth() &&
                 range1.end.getDate() === range2.end.getDate();
  return sameStart && sameEnd;
}

/**
 * Devuelve un texto de presentación para un rango de fechas.
 * Si coincide con un rango preset, devuelve la etiqueta de ese preset;
 * de lo contrario, devuelve el rango formateado.
 */
export function getDisplayText(range: DateRange): string {
  // Ver si el rango coincide con algún preset conocido
  const presets = getPresets();
  for (const preset of [...presets.actual, ...presets.previous]) {
    if (isSameRange(range, preset.range)) {
      return preset.label;
    }
  }
  // Si no coincide con ningún preset, formatea las fechas
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const startStr = range.start.toLocaleDateString('es-ES', options);
  const endStr = range.end.toLocaleDateString('es-ES', options);
  return startStr === endStr ? startStr : `${startStr} - ${endStr}`;
}

/**
 * Genera los presets de rango de fechas para "actuales" y "anteriores".
 */
export function getPresets(): { actual: PresetOption[]; previous: PresetOption[] } {
  const now = new Date();
  // Normalizar a medianoche para evitar componentes de hora
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Hoy
  const hoy: DateRange = { start: new Date(today), end: new Date(today) };
  // Ayer
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const ayer: DateRange = { start: new Date(yesterday), end: new Date(yesterday) };
  
  // Esta semana (lunes hasta hoy)
  const dayOfWeek = today.getDay(); // 0=Domingo, 1=Lunes, ... 6=Sábado
  const mondayOffset = (dayOfWeek + 6) % 7; // días desde el lunes
  const mondayThisWeek = new Date(today);
  mondayThisWeek.setDate(mondayThisWeek.getDate() - mondayOffset);
  const estaSemana: DateRange = { start: new Date(mondayThisWeek), end: new Date(today) };
  
  // Semana pasada (lunes a domingo de la semana pasada)
  const lastMonday = new Date(mondayThisWeek);
  lastMonday.setDate(lastMonday.getDate() - 7);
  const lastSunday = new Date(lastMonday);
  lastSunday.setDate(lastSunday.getDate() + 6);
  const semanaPasada: DateRange = { start: new Date(lastMonday), end: new Date(lastSunday) };
  
  // Este mes (inicio de mes hasta hoy)
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const esteMes: DateRange = { start: new Date(firstOfMonth), end: new Date(today) };
  
  // Mes pasado (primer día al último día del mes anterior)
  const prevMonth = today.getMonth() - 1;
  const prevYear = prevMonth < 0 ? today.getFullYear() - 1 : today.getFullYear();
  const prevMonthIndex = prevMonth < 0 ? 11 : prevMonth;
  const firstOfLastMonth = new Date(prevYear, prevMonthIndex, 1);
  const lastOfLastMonth = new Date(prevYear, prevMonthIndex + 1, 0);
  const mesPasado: DateRange = { start: new Date(firstOfLastMonth), end: new Date(lastOfLastMonth) };
  
  // Últimos 7 días (incluyendo hoy)
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const ult7dias: DateRange = { start: new Date(sevenDaysAgo), end: new Date(today) };
  
  // Últimos 30 días (incluyendo hoy)
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
  const ult30dias: DateRange = { start: new Date(thirtyDaysAgo), end: new Date(today) };
  
  // Definir opciones de preset con etiquetas
  const presetsActuales: PresetOption[] = [
    { label: 'Hoy', range: hoy },
    { label: 'Esta semana', range: estaSemana },
    { label: 'Este mes', range: esteMes },
  ];
  const presetsAnteriores: PresetOption[] = [
    { label: 'Ayer', range: ayer },
    { label: 'Semana pasada', range: semanaPasada },
    { label: 'Mes pasado', range: mesPasado },
    { label: 'Últimos 7 días', range: ult7dias },
    { label: 'Últimos 30 días', range: ult30dias },
  ];
  
  return { actual: presetsActuales, previous: presetsAnteriores };
}

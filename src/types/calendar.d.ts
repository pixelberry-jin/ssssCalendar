export interface ICalendar {
  state: IState;
}
interface IState {
  clickedFullDate: string | null;
  clickedDayIndex: number | null;
}

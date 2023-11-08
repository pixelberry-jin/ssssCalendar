import moment from "moment";
import "moment-lunar";

export function convertLunarToSolar(lunarDate: string): string {
  return moment(lunarDate, "YYYY-MM-DD").solar().format("YYYY-MM-DD");
}

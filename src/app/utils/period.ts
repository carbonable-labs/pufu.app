import { Period } from "../types/metrics/types";

export const PeriodToDifferenceLabel: Record<Period, string> = {
  [Period.DAILY]: "yesterday",
  [Period.WEEKLY]: "last week",
  [Period.MONTHLY]: "last month",
  [Period.YEARLY]: "last year",
};

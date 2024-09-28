import { Coordinates } from "./Coordinates";

export interface NewNewsItem {
    id: string,
    startDate: string,
    severity: string,
    categories: string[],
    summary: string[],
    recActions: string[],
    title: string,
    image: string,
    source: string
}
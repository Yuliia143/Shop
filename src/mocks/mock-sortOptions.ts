import { SortOptionInterface } from '../app/client/shared/interfaces/sorting-interfaces';

export enum SortTypeEnum {
    asc = 'asc',
    desc = 'desc'
}

export enum ValueTypeEnum {
    price = 'price',
    rating = 'rating'
}

export const SORT_OPTIONS: SortOptionInterface[] = [
    { label: 'Price(low > high)', direction: SortTypeEnum.asc, value: ValueTypeEnum.price },
    { label: 'Price(high > low)', direction: SortTypeEnum.desc, value: ValueTypeEnum.price },
    { label: 'Rating(low > high)', direction: SortTypeEnum.asc, value: ValueTypeEnum.rating },
    { label: 'Rating(high > low)', direction: SortTypeEnum.desc, value: ValueTypeEnum.rating },
];

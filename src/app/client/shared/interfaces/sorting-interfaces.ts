import { SortTypeEnum, ValueTypeEnum } from '@mocks/mock-sortOptions';

export interface SortValueInterface {
    sortBy: SortOptionInterface;
}

export interface SortOptionInterface {
    label: string;
    direction: SortTypeEnum;
    value: ValueTypeEnum;
}

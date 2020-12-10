import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product-interface';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { FiltersService } from '../../../shared/services/filters.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { FiltersInterface } from '../../../shared/interfaces/filters-interface';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
    @Input() products: ProductInterface[];
    @Output() changeFilter: EventEmitter<FiltersInterface> = new EventEmitter();

    public objectKeys = Object.keys;
    private unsubscribeAll = new Subject();

    private maxPrice: number;
    public stars: number[] = [5, 4, 3, 2, 1];
    public options: Options;

    public categories: {};
    public brands: string[];

    public filtersForm: FormGroup;

    constructor(private filtersService: FiltersService) {
    }

    ngOnInit(): void {
        this.categories = this.getUniqueCategories();
        this.brands = this.getUniqueBrands();
        this.maxPrice = this.getMaxPrice();
        this.options = this.initializeOptions();
        this.filtersForm = this.initializeForm();
        this.onChanges();
    }

    private initializeForm(): FormGroup {
        return new FormGroup({
            category: new FormControl(''),
            brands: new FormArray(this.brands.map(() => new FormControl(false))),
            rating: new FormArray(this.stars.map(() => new FormControl(false))),
            price: new FormControl([0, this.maxPrice])
        });
    }


    private initializeOptions(): Options {
        return {
            floor: 0,
            ceil: this.maxPrice,
            step: 1
        };
    }

    private onChanges(): void {
        this.filtersForm.valueChanges.pipe(
            distinctUntilChanged()
        ).subscribe(val => {
            this.filtersService.handleFilters({
                ...val,
                brands: this.getSelectedBrands(val.brands),
                rating: this.getSelectedRating(val.rating)
            });
            this.changeFilter.emit();
        });
    }

    private getSelectedBrands(brands: boolean[]): string[] {
        const selectedBrands: string[] = [];
        if (brands.includes(true)) {
            brands.map((item, index) => {
                if (item) {
                    selectedBrands.push(this.brands[index]);
                }
            });
        }
        return selectedBrands;
    }

    private getSelectedRating(rating: boolean[]): number[] {
        const selectedRating: number[] = [];
        if (rating.includes(true)) {
            rating.map((item, index) => {
                if (item) {
                    selectedRating.push(this.stars[index]);
                }
            });
        }
        return selectedRating;
    }

    private getUniqueCategories(): {} {
        const allCategories = this.products.map(product => product.category.toLowerCase());
        return allCategories.reduce((acc, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});
    }

    private getUniqueBrands(): string[] {
        const allBrands = this.products.map(product => product.farm.toLowerCase());
        return [...new Set(allBrands)];
    }

    private getMaxPrice(): number {
        const allPrices = this.products.map(product => product.price);
        return Math.ceil(Math.max(...allPrices));
    }

    public handleMinValue(event: Event): void {
        const max = this.filtersForm.controls.price.value[1];
        const target = event.target as HTMLInputElement;
        if (target.value) {
            this.filtersForm.controls.price.setValue([target.value, max]);
        }
    }

    public handleMaxValue(event: Event): void {
        const min = this.filtersForm.controls.price.value[0];
        const target = event.target as HTMLInputElement;
        if (target.value) {
            this.filtersForm.controls.price.setValue([min, target.value]);
        }
    }

    public resetForm(): void {
        window.scrollTo(0, 0);
        this.filtersForm.reset({
            category: '',
            price: [0, this.maxPrice]
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}

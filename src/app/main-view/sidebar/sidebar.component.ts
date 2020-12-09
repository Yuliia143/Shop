import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { FiltersService } from '../../services/filters.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { FiltersInterface } from '../../interfaces/filters-interface';
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
        this.filtersService.handleFilters(this.filtersForm);
    }

    ngOnInit(): void {
        this.categories = this.getUniqueCategories();
        this.brands = this.getUniqueBrands();
        this.maxPrice = this.getMaxPrice();
        this.options = this.initializeOptions();
        this.filtersForm = this.initializeForm();
        this.onChanges();
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
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
            const selectedBrands = [];
            const selectedRating = [];
            if (val.brands.includes(true)) {
                val.brands.map((item, index) => {
                    if (item === true) {
                        selectedBrands.push(this.brands[index]);
                    }
                });
            }
            if (val.rating.includes(true)) {
                val.rating.map((item, index) => {
                    if (item === true) {
                        selectedRating.push(this.stars[index]);
                    }
                });
            }
            this.filtersService.handleFilters({ ...val, brands: selectedBrands, rating: selectedRating });
            this.changeFilter.emit();
        });
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

    public handleMinValue(event: { target: HTMLInputElement }): void {
        const max = this.filtersForm.controls.price.value[1];
        if (event.target.value) {
            this.filtersForm.controls.price.setValue([event.target.value, max]);
        }
    }

    public handleMaxValue(event: { target: HTMLInputElement }): void {
        const min = this.filtersForm.controls.price.value[0];
        if (event.target.value) {
            this.filtersForm.controls.price.setValue([min, event.target.value]);
        }
    }

    public resetForm(): void {
        window.scrollTo(0, 0);
        this.filtersForm.reset();
    }

}

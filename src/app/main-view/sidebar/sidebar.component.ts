import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { FiltersService } from '../../services/filters.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Input() products: ProductInterface[];
    @Output() onChangeFilter: EventEmitter<any> = new EventEmitter();

    @ViewChild('formElement') formElement;
    public objectKeys = Object.keys;

    private maxPrice: number;
    public stars: number[] = [5, 4, 3, 2, 1];
    public options: Options;

    public categories: {};
    public brands: string[];
    public filtersForm: FormGroup = new FormGroup({
        category: new FormControl(''),
        brands: new FormArray([]),
        rating: new FormArray([]),
        price: new FormControl([0, 0])
    });

    constructor(private filtersService: FiltersService) {
        this.filtersForm.valueChanges.subscribe(filters => {
            this.filtersService.handleFilters(filters);
            this.onChangeFilter.emit();
        });
    }

    ngOnInit(): void {
        this.categories = this.getUniqueCategories();
        this.brands = this.getUniqueBrands();
        this.maxPrice = this.getMaxPrice();
        this.options = this.initializeOptions();
        this.filtersForm.controls.price.setValue([0, this.maxPrice]);
    }

    private initializeOptions(): Options {
        return {
            floor: 0,
            ceil: this.maxPrice,
            step: 1
        };
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

    public handleChange(event, arrayName: string): void {
        const array = this.filtersForm.controls[arrayName] as FormArray;
        if (event.target.checked) {
            array.push(new FormControl(event.target.value));
        } else {
            const index = array.controls.findIndex(idx => idx.value === event.target.value);
            array.removeAt(index);
        }
    }

    public handleMinValue(event): void {
        const max = this.filtersForm.controls.price.value[1];
        if (event.target.value) {
            this.filtersForm.controls.price.setValue([event.target.value, max]);
        }
    }

    public handleMaxValue(event): void {
        const min = this.filtersForm.controls.price.value[0];
        if (event.target.value) {
            this.filtersForm.controls.price.setValue([min, event.target.value]);
        }
    }

    public resetForm(): void { // TODO
        // window.scrollTo(0, 0);
        // this.formElement.nativeElement.querySelectorAll('input').forEach(input => input.checked = false);

        this.filtersForm.reset({
            category: '',
            brands: (this.filtersForm.controls.brands as FormArray).clear(),
            rating: (this.filtersForm.controls.rating as FormArray).clear(),
            price: [0, this.maxPrice]
        });
    }

}

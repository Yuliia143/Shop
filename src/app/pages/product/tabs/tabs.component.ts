import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit {
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
        const activeTabs = this.tabs.filter((tab) => tab.active);
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    public selectTab(tab): void {
        this.tabs.toArray().forEach(item => item.active = false);
        tab.active = true;
    }

}

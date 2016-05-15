import { Component } from 'angular2/core';
import { JSONP_PROVIDERS } from 'angular2/http';
import { Control } from 'angular2/common';
import { Observable } from 'rxjs/Observable';
import { ObservableBasedWikipediaService } from '../services/observable.wiki.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'observable-wiki-search',
    providers: [ObservableBasedWikipediaService, JSONP_PROVIDERS],
    template: `
        <div>
            <h3>Wikipedia Search (Observable Based Implementation)</h3>
            <input type="text" [ngFormControl]="term">
            <ul>
                <li *ngFor="#item of items | async">{{item}}</li>
            </ul>
        </div>
    `
})
export class ObeservableWikiSearchComponent {
    
    items: Observable<Array<string>>;
    
    term = new Control();
    
    constructor(private wikiService: ObservableBasedWikipediaService){
        
        this.items = this.term.valueChanges
                              .debounceTime(400)
                              .distinctUntilChanged()
                              .switchMap((term: string) => this.wikiService.search(term));
    }
    
    
}
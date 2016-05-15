import { Component } from 'angular2/core';
import { JSONP_PROVIDERS } from 'angular2/http';
import { PromisedBasedWikipediaService } from '../services/promise.wiki.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'promise-wiki-search',
    providers: [PromisedBasedWikipediaService, JSONP_PROVIDERS],
    template: `
        <div>
            <h3>Wikipedia Search (Promised Based Implementation)</h3>
            <input #term type="text" (keyup)="search(term.value)">
            <ul>
                <li *ngFor="#item of items">{{item}}</li>
            </ul>
        </div>
    `
})
export class PromiseBasedWikiSearchComponent {
    
    items: Array<string>;
    
    constructor(private wikiService: PromisedBasedWikipediaService){}
    
    search(term: string){
        this.wikiService.search(term)
                        .then(items => this.items = items);
    }
}
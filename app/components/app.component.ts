import { Component } from 'angular2/core';
import { PromiseBasedWikiSearchComponent } from './promise.wikisearch.component';
import { ObeservableWikiSearchComponent } from './observable.wikisearch.component';

@Component({
    selector: 'app-root',
    template: `
        <h1>Angular 2 Starter Project</h1>
        <br>
        <promise-wiki-search></promise-wiki-search>
        <br>
        <observable-wiki-search></observable-wiki-search>
    `,
    directives: [PromiseBasedWikiSearchComponent, ObeservableWikiSearchComponent]
})
export class AppComponent {
    
}
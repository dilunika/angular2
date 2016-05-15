import {Injectable} from 'angular2/core';
import { URLSearchParams, Jsonp } from 'angular2/http';
import { WikipediaService } from './wiki.service';

@Injectable()
export class PromisedBasedWikipediaService implements WikipediaService{
    
    constructor(private jsonp: Jsonp){}
    
    search(term: string){
        
        let search = new URLSearchParams();
        search.set('action', 'opensearch');
        search.set('search', term);
        search.set('format', 'json');
        
        return this.jsonp.get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', {search})
                         .toPromise()
                         .then((res) => res.json()[1]);
    }
}
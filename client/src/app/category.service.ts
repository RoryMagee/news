import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  category = '';
  private articles = new BehaviorSubject<any>('');
  currentData = this.articles.asObservable();

  constructor(private rest: RestApiService) { }

  setCategory(cat: string) {
    this.category = cat;
    this.getArticles();
  }

  getCategory() {
    return this.category;
  }

  getList() {
    return this.articles.value;
  }

  async getArticles() {
    try {
      if (this.getCategory()) {
        console.log(this.getCategory())
        const data = await this.rest.get(environment.url + '/api/' + this.getCategory());
        data['response']['status'] ? this.articles.next(data['response']['articles']) : console.log("Data not OK");
        console.log(this.articles.value);
        return this.articles;
      } else {
        const data = await this.rest.get(environment.url + '/api/');
        data['response']['status'] ? this.articles.next(data['response']['articles']) : console.log("Data not OK");
        console.log(this.articles.value);
        return this.articles;
      } 
    } catch(error) {
      console.log(error);
    }
  }

  async search(q: string) {
    try {
      console.log(q);
      console.log(environment.url + '/api/search/' + encodeURIComponent(q));
      const data = await this.rest.get(environment.url + '/api/search/' + encodeURIComponent(q));
      data['response']['status'] ? this.articles.next(data['response']['articles']) : console.log("Data not OK");
      console.log(this.articles.value);
      return this.articles.value;
    } catch (error) {
      console.log(error);
    }
  }
}

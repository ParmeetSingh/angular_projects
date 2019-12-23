import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import {throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService{

    error = new Subject<string>();
    constructor(private http: HttpClient,
        private postsService: PostsService){
        
    }
    createAndStorePost(title:string,content:string){
        //...
        // Send Http request
        //console.log(postData);
        const postData: Post = {title: title, content: content};     
        this.http.post<{name:string}>('https://ng-complete-guide-3cb01.firebaseio.com/posts.json',postData)
        .subscribe(response=>{console.log(response)});
    }
    fetchPosts(){
        return this.http
    .get<{[key:string]: Post}>('https://ng-complete-guide-3cb01.firebaseio.com/posts.json',{
        headers: new HttpHeaders({'Custom-Header':'Hello'})
    })
    .pipe(
        map(response => {
            const postsArray: Post[] = [];
            for(const key in response){
            if(response.hasOwnProperty(key)){
                postsArray.push({...response[key],id:key})
            }
        catchError(errorRes => {
            return  throwError(errorRes);
        })
      }
      return postsArray;
    }));
    }

    deletePosts(){
        return this.http.delete('https://ng-complete-guide-3cb01.firebaseio.com/posts.json');
    }

}
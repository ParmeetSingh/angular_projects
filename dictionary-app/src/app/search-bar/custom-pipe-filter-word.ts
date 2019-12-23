import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'synonymPipe'})
export class SynonymPipe implements PipeTransform {
  new_words: string[]=[];
  transform(synonyms: string,word:string): string[] {
    let arr = synonyms.split(",").map(function(item) {
        return item.trim();
    });
    for(let synonym_word in arr){
      if(arr[synonym_word] !== word){
        this.new_words.push("<a href=''>"+arr[synonym_word]+"</a>");
      }
    }
    return this.new_words;
  }
}
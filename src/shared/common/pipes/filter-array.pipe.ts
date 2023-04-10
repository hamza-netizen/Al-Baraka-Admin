import { EventManagementCategoryMappingDto } from './../../Interfaces/event-management-category-mapping-dto.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArrayPipe'
})
export class FilterArrayPipe implements PipeTransform {

  transform(eventCategory: EventManagementCategoryMappingDto[], categoryId?: number, price?: number, noOfSeats?: number): EventManagementCategoryMappingDto[]{
    console.log('Category PIPE', eventCategory);
    console.log('categoryId PIPE', categoryId);
    console.log('price PIPE', price);

    let filterdCategory = eventCategory;

    if(categoryId)
      filterdCategory = filterdCategory.filter(x => x.categoryId == categoryId);

    if(price)
      filterdCategory = filterdCategory.filter(x => x.price == price);

    if(noOfSeats)
      filterdCategory = filterdCategory.filter(x => x.noOfSeats == noOfSeats);

    return filterdCategory;
    
  }
}

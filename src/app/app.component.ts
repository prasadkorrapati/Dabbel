import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dabbel';
  public showSidebar = false;
  public showCart = false;
  public reducer = (accumulator, current) => accumulator + (current.count * current.price);

  public shopping_cart_items = [ 
    { name: "item 1", count: 1, price: 339.99 },
    { name: "item 2", count: 1, price: 129.29 },
    { name: "item 3", count: 1, price: 669.99 },
    { name: "item 4", count: 1, price: 999.99 }
  ]; 

  // toggleSidebar(event) {
  //   console.log('toggeling side bar');
  //   this.showSidebar = !this.showSidebar;
  //   event.stopPropagation()();
  // }
  @HostListener("document:click")
  clickedOnDocument() {
    this.showSidebar = false;
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
  totalCount() {
    return this.shopping_cart_items.reduce(this.reducer, 0);
  }

  reduceItemCount(item) {
    item.count > 0 ? (item.count = item.count-1) : 0;
  }
  increateItemCount(item) {
    item.count++;
  }
}

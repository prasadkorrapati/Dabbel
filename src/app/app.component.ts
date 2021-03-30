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
  public cartPriceReducer = (accumulator, current) => accumulator + (current.count * current.price);
  public cartItemCountReducer = (accumulator, current) => accumulator + current.count;

  public shopping_cart_backup = [ 
    { name: "item 1", count: 1, price: 339.99 },
    { name: "item 2", count: 1, price: 129.29 },
    { name: "item 3", count: 1, price: 669.99 },
    { name: "item 4", count: 1, price: 999.99 }
  ];

  public shopping_cart_items = this.shopping_cart_backup.map(each => Object.assign({}, each));


  toggleSidebar(event) {
    console.log('toggeling side bar');
    this.showSidebar = !this.showSidebar;
    this.stopPropagation(event);
  }

  @HostListener("document:click")
  clickedOnDocument() {
    this.showSidebar = false;
    this.showCart = false;
  }

  toggleCart(event) {
    this.showCart = !this.showCart;
    this.stopPropagation(event);
  }

  removeItemFromCart(index, item) {
    this.shopping_cart_items.splice(index, 1);
  }

  stopPropagation($event) {
    $event.stopPropagation()
  }
  totalCartCount() {
    return this.shopping_cart_items.reduce(this.cartItemCountReducer,0)
  }

  totalPriceCount() {
    return this.shopping_cart_items.reduce(this.cartPriceReducer, 0);
  }

  reduceItemCount(item) {
    item.count > 0 ? (item.count = item.count-1) : 0;
  }
  increateItemCount(item) {
    item.count++;
  }

  checkout() {
    alert('Yout Transaction finished successfully!');
    this.shopping_cart_items = this.shopping_cart_backup.map(each => Object.assign({}, each));
  }
}

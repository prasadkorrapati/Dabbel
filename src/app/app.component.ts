import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dabbel';
  public showSidebar = false;
  public showCart = false;
  public shopping_cart_items ;
  public cartItemCount;
  public totalCartPrice;
  public cartPriceReducer = (accumulator, current) => accumulator + (current.count * current.price);
  public cartItemCountReducer = (accumulator, current) => accumulator + current.count;
  
  public shopping_cart_backup = [ 
    { name: "item 1", count: 1, price: 339.99 },
    { name: "item 2", count: 1, price: 129.29 },
    { name: "item 3", count: 1, price: 669.99 },
    { name: "item 4", count: 1, price: 999.99 }
  ];

  ngOnInit(): void {
      this.shopping_cart_items = this.shopping_cart_backup.map(each => Object.assign({}, each));
      this.updateCartDetails();
  }


  public toggleSidebar(event) {
    this.showSidebar = !this.showSidebar;
    this.stopPropagation(event);
  }

  @HostListener("document:click")
  public clickedOnDocument() {
    this.showSidebar = false;
    this.showCart = false;
  }

  public toggleCart(event) {
    this.showCart = !this.showCart;
    this.stopPropagation(event);
  }

  public removeItemFromCart(index, item) {
    this.shopping_cart_items.splice(index, 1);
    this.updateCartDetails();
  }

  public stopPropagation($event) {
    $event.stopPropagation()
  }

  public reduceItemCount(item) {
    if(item.count > 0) {
      item.count --;
      this.updateCartDetails();
    }
  }

  public increateItemCount(item) {
    item.count++;
    this.updateCartDetails();
  }
  

  public checkout() {
    alert('Yout Transaction finished successfully!');
    this.shopping_cart_items = this.shopping_cart_backup.map(each => Object.assign({}, each));
    this.showCart = false;
    this.updateCartDetails();
  }

  private updateCartDetails() {
    this.cartItemCount = this.shopping_cart_items.reduce(this.cartItemCountReducer,0)
    this.totalCartPrice = this.shopping_cart_items.reduce(this.cartPriceReducer, 0);
  }
 }

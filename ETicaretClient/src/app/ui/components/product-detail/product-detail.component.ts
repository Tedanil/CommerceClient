import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent extends BaseComponent implements OnInit {

  @Input() product: List_Product;
  @Input() productImageFiles = '';


  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService, private basketService: BasketService, spinner: NgxSpinnerService, private customToastrService: CustomToastrService) {
    super(spinner)
  }

  baseUrl: BaseUrl;
  id: string;
 



  async ngOnInit(): Promise<void> {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    

    this.activatedRoute.params.subscribe(async params => {
      this.id = params["id"];
      


      
      const data: { product: List_Product } = await this.productService.getProductById(this.id as string);
      
      this.product = data.product;
      
      this.product.imagePath =  this.product.productImageFiles.length ? this.product.productImageFiles.find(p => p.showcase).path : "";
      



    });

  }

  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.Pacman);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = this.id;
    _basketItem.quantity = 1;
    
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.Pacman);
   
    this.customToastrService.message("Ürün sepete eklenmiştir.", "Sepete Eklendi", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }

}

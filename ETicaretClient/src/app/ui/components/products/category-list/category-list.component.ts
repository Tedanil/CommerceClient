import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private fileService: FileService, private basketService: BasketService, spinner: NgxSpinnerService,
    private customToastrService: CustomToastrService, private router: Router) {
    super(spinner)
  }

  categoryName: string;
  totalProductCount: number;
  baseUrl: BaseUrl;
  products: List_Product[];
  selectedProduct: List_Product;

  async ngOnInit() {

    this.baseUrl = await this.fileService.getBaseStorageUrl();



    this.activatedRoute.params.subscribe(async params => {
      this.categoryName = params["categoryName"] ;

      const data: { totalProductCount: number, products: List_Product[] } = await this.productService
        .readCategory(this.categoryName,
          () => {

          },
          errorMessage => {

          });
          

      this.products = data.products;

      console.log(this.products)

      // alttakini categorylistte kullan products/:categoryName burdaki name neye eşitse dinamik olarak o sayfayı çağırsın
      this.products = this.products.filter(p => p.categoryName == this.categoryName);


      console.log(this.products)
      



      this.products = this.products.map<List_Product>(p => {
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles,
          description: p.description,
          categoryName: p.categoryName
        };




        return listProduct;
      });
    });  

  }

  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.Pacman);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.Pacman);
    this.customToastrService.message("Ürün sepete eklenmiştir.", "Sepete Eklendi", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }

  productView(product: List_Product) {
    //console.log(id);
    this.selectedProduct = product;
    this.router.navigateByUrl(`products/${product.id}`);
  }

}

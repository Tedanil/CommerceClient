
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { EditProductDialogComponent } from 'src/app/dialogs/edit-product-dialog/edit-product-dialog.component';
import { QrcodeDialogComponent } from 'src/app/dialogs/qrcode-dialog/qrcode-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';






@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  length: number;
  pageSize: number;
  pageIndex: number;

  constructor(spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }


  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'categoryName', 'photos', 'qrcode', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Product> = null;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  async getProducts() {

    this.showSpinner(SpinnerType.SquareJellyBox);
    const allProducts: { totalProductCount: number; products: List_Product[] } = await this.productService
      .read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.SquareJellyBox), errorMessage => this.alertifyService.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);

    this.paginator.length = allProducts.totalProductCount;


  }


  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: "1400px"
      }

    });
  }

  editProduct(id: string) {
    this.dialogService.openDialog({
      componentType: EditProductDialogComponent,
      data: id,
      options: {
        width: "350px"
      },
      afterClosed: () => {
        this.ngOnInit().then(() => {
          console.log("Ürünler başarıyla güncellendi");
        }).catch(error => {
          console.error("Ürünleri güncellerken bir hata oluştu:", error);
        });
      }
    });
  }
  



  async ngOnInit() {

    await this.getProducts();


  }


  async handlePageEvent() {

    await this.getProducts();

  }

  showQRCode(productId: string) {
    this.dialogService.openDialog({
      componentType: QrcodeDialogComponent,
      data: productId,
      afterClosed: () => { }
    })
  }

 





}

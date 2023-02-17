import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { Update_Product } from 'src/app/contracts/product/update_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent extends BaseDialog<EditProductDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditProductState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private alertify: AlertifyService) {
    super(dialogRef)
  }

  product: List_Product;

  async ngOnInit() {
    const data: { product: List_Product } = await this.productService.getProductById(this.data as string);

    this.product = data.product;


  }

  async edit(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement, categoryName: HTMLSelectElement, description: HTMLInputElement) {
    this.spinner.show(SpinnerType.Pacman);

    const product: Update_Product = new Update_Product();
    product.id = this.data as string;
    product.name = name.value;
    product.stock = parseInt(stock.value);
    product.price = parseFloat(price.value);
    product.categoryName = categoryName.value;
    product.description = description.value;

    await this.productService.update(product, () => {
      this.spinner.hide(SpinnerType.Pacman);
      this.alertify.message("Ürün Başariyla Güncellenmiştir.", {

        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight

      });
      this.dialogRef.close();

    });


  }

}

export enum EditProductState {
  Close
}


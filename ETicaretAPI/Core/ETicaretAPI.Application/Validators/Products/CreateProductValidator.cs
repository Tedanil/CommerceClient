using ETicaretAPI.Application.ViewModels.Products;
using FluentValidation;


namespace ETicaretAPI.Application.Validators.Products
{
    public class CreateProductValidator: AbstractValidator<VM_Create_Product>
    {
        public CreateProductValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty()
                .NotNull()
                   .WithMessage("Lütfen Ürün Adını Boş Bırakmayınız..")
                .MaximumLength(150)
                .MinimumLength(3)
                   .WithMessage("Lütfen Ürün adını 3 ile 150 karakter arasında giriniz..");

            RuleFor(p => p.Stock)
                .NotEmpty()
                .NotNull()
                   .WithMessage("Lütfen Stok alanını Boş Bırakmayınız..")
                .Must(s => s >= 0)
                   .WithMessage("Stok adedi 0 dan büyük olmalıdır..");

            RuleFor(p => p.Price)
                .NotEmpty()
                .NotNull()
                   .WithMessage("Lütfen Stok alanını Boş Bırakmayınız..")
                .Must(s => s >= 0)
                   .WithMessage("Stok adedi 0 dan büyük olmalıdır..");







        }
    }
}

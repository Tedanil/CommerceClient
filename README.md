# eCommerceClient

Project Description:
This project is an online shopping website where customers can register, browse products, and place orders. The website provides a platform for customers to purchase products from different categories. Customers can create an account to manage their personal information, view their order history, and track their orders.

The website has a user-friendly interface that allows customers to easily navigate and find products. They can filter and sort products by category, price range, popularity, and other attributes. Customers can add products to their cart and checkout by entering their shipping and billing information. The website integrates with a payment gateway to securely process online transactions.

The website also includes an administrator panel where site administrators can manage products, orders, customers, and other site settings. Administrators can add, edit, or delete products, view orders and customer information, and update site settings.

The website is built using the ASP.NET Core framework with Entity Framework for database management. Authentication and authorization are implemented using JWT Bearer tokens. The front-end is built using Angular, and the website is designed using the Bootstrap framework for responsive and mobile-friendly layout.

The project includes documentation to help developers understand the architecture and design of the website. The documentation covers the project overview, technical requirements, database schema, API endpoints, and user interfaces. The documentation also includes instructions for setting up the development environment and deploying the website to a production server.

Overall, this project provides a reliable and scalable solution for building an online shopping website with essential features for both customers and site administrators.


Technologies and Tools Used:

- .NET Core 6
- Entity Framework Core 6.0.9
- PostgreSQL
- Docker
- Angular 14
- Bootstrap 5.2.1


Libraries Used:

"BACKEND"
- Azure.Storage.Blobs 12.13.1
- FluentValidation 11.2.2
- FluentValidation.AspNetCore 11.2.2
- FluentValidation.DependencyInjectionExtensions 11.2.2
- Google.Apis.Auth 1.57.0
- MediatR 10.0.1
- MediatR.Extensions.Microsoft.DependencyInjection 10.0.1
- Microsoft.AspNetCore.Authentication.JwtBearer 6.0.9
- Microsoft.AspNetCore.Http 2.2.2
- Microsoft.AspNetCore.Identity 2.2.0
- Microsoft.AspNetCore.Identity.EntityFrameworkCore 6.0.9
- Microsoft.EntityFrameworkCore 6.0.9
- Microsoft.EntityFrameworkCore.Design 6.0.9
- Microsoft.EntityFrameworkCore.Tools 6.0.9
- Microsoft.Extensions.Configuration 6.0.1
- Microsoft.Extensions.Configuration.Json 6.0.0
- Microsoft.Extensions.DependencyInjection.Abstractions 6.0.0
- Npgsql.EntityFrameworkCore.PostgreSQL 6.0.6
- QRCoder 1.4.3
- Serilog 2.12.0
- Serilog.AspNetCore 6.0.1
- Serilog.Sinks.PostgreSQL 2.3.0
- Swashbuckle.AspNetCore 6.2.3


"FRONTEND"

"@abacritt/angularx-social-login": "^1.2.5",
"@angular/forms": "^14.0.0",
"@angular/material": "^14.2.1",
"@auth0/angular-jwt": "^5.0.2",
"@microsoft/signalr": "^6.0.9",
"alertifyjs": "^1.13.1",
"bootstrap": "^5.2.1",
"jquery": "^3.6.1",
"ngx-file-drop": "^14.0.1",
"ngx-scanner-qrcode": "^1.1.4",
"ngx-spinner": "^14.0.0",
"ngx-toastr": "^15.0.0",    


<h2>Architecture:</h2>

The project has been developed using the Onion Architecture pattern, which provides a clear separation of concerns between the layers of the application. The following sections provide detailed information on:

-Data flow
-Relationships
-Communication between modules
In the Onion Architecture, the application is divided into layers, each with a specific responsibility. The layers are organized in a way that the outer layers depend on the inner layers, but not vice versa. This allows for easy testing, maintenance, and scalability of the application.

The three main layers of the Onion Architecture are the Presentation layer, the Application layer, and the Domain layer. The Presentation layer is responsible for handling user input and displaying output. The Application layer contains the business logic of the application, and the Domain layer defines the data model and the rules of the application.

The Onion Architecture also includes the Infrastructure layer, which provides access to external services and resources. This layer is isolated from the rest of the application, and changes in the infrastructure do not affect the other layers.

The result of using the Onion Architecture is a flexible and maintainable application that is easy to modify and extend.





    





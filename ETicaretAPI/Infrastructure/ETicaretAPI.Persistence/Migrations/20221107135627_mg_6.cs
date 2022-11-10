using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ETicaretAPI.Persistence.Migrations
{
    public partial class mg_6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppRoleEndpoint_AspNetRoles_AppRolesId",
                table: "AppRoleEndpoint");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppRoleEndpoint",
                table: "AppRoleEndpoint");

            migrationBuilder.DropIndex(
                name: "IX_AppRoleEndpoint_EndpointsId",
                table: "AppRoleEndpoint");

            migrationBuilder.RenameColumn(
                name: "AppRolesId",
                table: "AppRoleEndpoint",
                newName: "RolesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppRoleEndpoint",
                table: "AppRoleEndpoint",
                columns: new[] { "EndpointsId", "RolesId" });

            migrationBuilder.CreateIndex(
                name: "IX_AppRoleEndpoint_RolesId",
                table: "AppRoleEndpoint",
                column: "RolesId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppRoleEndpoint_AspNetRoles_RolesId",
                table: "AppRoleEndpoint",
                column: "RolesId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppRoleEndpoint_AspNetRoles_RolesId",
                table: "AppRoleEndpoint");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppRoleEndpoint",
                table: "AppRoleEndpoint");

            migrationBuilder.DropIndex(
                name: "IX_AppRoleEndpoint_RolesId",
                table: "AppRoleEndpoint");

            migrationBuilder.RenameColumn(
                name: "RolesId",
                table: "AppRoleEndpoint",
                newName: "AppRolesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppRoleEndpoint",
                table: "AppRoleEndpoint",
                columns: new[] { "AppRolesId", "EndpointsId" });

            migrationBuilder.CreateIndex(
                name: "IX_AppRoleEndpoint_EndpointsId",
                table: "AppRoleEndpoint",
                column: "EndpointsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppRoleEndpoint_AspNetRoles_AppRolesId",
                table: "AppRoleEndpoint",
                column: "AppRolesId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

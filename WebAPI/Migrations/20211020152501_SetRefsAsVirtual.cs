using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class SetRefsAsVirtual : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "itemGroup",
                table: "Items",
                newName: "ItemGroup");

            migrationBuilder.RenameColumn(
                name: "itemId",
                table: "Items",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "itemGroupId",
                table: "ItemGroups",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ingredientTypeId",
                table: "IngredientTypes",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ingredientType",
                table: "Ingredients",
                newName: "IngredientType");

            migrationBuilder.RenameColumn(
                name: "ingredientId",
                table: "Ingredients",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "drinkTypeId",
                table: "DrinkTypes",
                newName: "id");

            migrationBuilder.AlterColumn<string>(
                name: "ItemGroup",
                table: "Items",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IngredientType",
                table: "Ingredients",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ItemGroup",
                table: "Items",
                column: "ItemGroup");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_IngredientType",
                table: "Ingredients",
                column: "IngredientType",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_IngredientTypes_IngredientType",
                table: "Ingredients",
                column: "IngredientType",
                principalTable: "IngredientTypes",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_ItemGroups_ItemGroup",
                table: "Items",
                column: "ItemGroup",
                principalTable: "ItemGroups",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_IngredientTypes_IngredientType",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_ItemGroups_ItemGroup",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_ItemGroup",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Ingredients_IngredientType",
                table: "Ingredients");

            migrationBuilder.RenameColumn(
                name: "ItemGroup",
                table: "Items",
                newName: "itemGroup");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Items",
                newName: "itemId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "ItemGroups",
                newName: "itemGroupId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "IngredientTypes",
                newName: "ingredientTypeId");

            migrationBuilder.RenameColumn(
                name: "IngredientType",
                table: "Ingredients",
                newName: "ingredientType");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Ingredients",
                newName: "ingredientId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "DrinkTypes",
                newName: "drinkTypeId");

            migrationBuilder.AlterColumn<string>(
                name: "itemGroup",
                table: "Items",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "ingredientType",
                table: "Ingredients",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class RemoveMapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_IngredientTypes_IngredientType",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Items_Ingredient",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemGroups_Ingredients_ItemGroup",
                table: "ItemGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_ItemGroups_ItemGroup",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_ItemGroup",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_ItemGroups_ItemGroup",
                table: "ItemGroups");

            migrationBuilder.DropIndex(
                name: "IX_Ingredients_Ingredient",
                table: "Ingredients");

            migrationBuilder.DropIndex(
                name: "IX_Ingredients_IngredientType",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "ItemGroup",
                table: "ItemGroups");

            migrationBuilder.DropColumn(
                name: "Ingredient",
                table: "Ingredients");

            migrationBuilder.RenameColumn(
                name: "ItemGroup",
                table: "Items",
                newName: "itemGroup");

            migrationBuilder.RenameColumn(
                name: "IngredientType",
                table: "Ingredients",
                newName: "ingredientType");

            migrationBuilder.AlterColumn<string>(
                name: "itemGroup",
                table: "Items",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "Ingredientid",
                table: "IngredientTypes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ingredientType",
                table: "Ingredients",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_IngredientTypes_Ingredientid",
                table: "IngredientTypes",
                column: "Ingredientid");

            migrationBuilder.AddForeignKey(
                name: "FK_IngredientTypes_Ingredients_Ingredientid",
                table: "IngredientTypes",
                column: "Ingredientid",
                principalTable: "Ingredients",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_IngredientTypes_Ingredients_Ingredientid",
                table: "IngredientTypes");

            migrationBuilder.DropIndex(
                name: "IX_IngredientTypes_Ingredientid",
                table: "IngredientTypes");

            migrationBuilder.DropColumn(
                name: "Ingredientid",
                table: "IngredientTypes");

            migrationBuilder.RenameColumn(
                name: "itemGroup",
                table: "Items",
                newName: "ItemGroup");

            migrationBuilder.RenameColumn(
                name: "ingredientType",
                table: "Ingredients",
                newName: "IngredientType");

            migrationBuilder.AlterColumn<string>(
                name: "ItemGroup",
                table: "Items",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "ItemGroup",
                table: "ItemGroups",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IngredientType",
                table: "Ingredients",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Ingredient",
                table: "Ingredients",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_ItemGroup",
                table: "Items",
                column: "ItemGroup");

            migrationBuilder.CreateIndex(
                name: "IX_ItemGroups_ItemGroup",
                table: "ItemGroups",
                column: "ItemGroup");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_Ingredient",
                table: "Ingredients",
                column: "Ingredient");

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
                name: "FK_Ingredients_Items_Ingredient",
                table: "Ingredients",
                column: "Ingredient",
                principalTable: "Items",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemGroups_Ingredients_ItemGroup",
                table: "ItemGroups",
                column: "ItemGroup",
                principalTable: "Ingredients",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_ItemGroups_ItemGroup",
                table: "Items",
                column: "ItemGroup",
                principalTable: "ItemGroups",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

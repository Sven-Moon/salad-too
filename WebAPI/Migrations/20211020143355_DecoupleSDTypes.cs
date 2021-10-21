using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class DecoupleSDTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_IngredientTypes_ingredientTypeId",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Items_itemId",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemGroups_Ingredients_ingredientId",
                table: "ItemGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_ItemGroups_itemGroupId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_itemGroupId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Ingredients_ingredientTypeId",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "itemGroupId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ingredientTypeId",
                table: "Ingredients");

            migrationBuilder.RenameColumn(
                name: "ingredientId",
                table: "ItemGroups",
                newName: "ItemGroup");

            migrationBuilder.RenameIndex(
                name: "IX_ItemGroups_ingredientId",
                table: "ItemGroups",
                newName: "IX_ItemGroups_ItemGroup");

            migrationBuilder.RenameColumn(
                name: "itemId",
                table: "Ingredients",
                newName: "Ingredient");

            migrationBuilder.RenameIndex(
                name: "IX_Ingredients_itemId",
                table: "Ingredients",
                newName: "IX_Ingredients_Ingredient");

            migrationBuilder.AddColumn<string>(
                name: "itemGroup",
                table: "Items",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ingredientType",
                table: "Ingredients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_Items_Ingredient",
                table: "Ingredients",
                column: "Ingredient",
                principalTable: "Items",
                principalColumn: "itemId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemGroups_Ingredients_ItemGroup",
                table: "ItemGroups",
                column: "ItemGroup",
                principalTable: "Ingredients",
                principalColumn: "ingredientId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Items_Ingredient",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemGroups_Ingredients_ItemGroup",
                table: "ItemGroups");

            migrationBuilder.DropColumn(
                name: "itemGroup",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ingredientType",
                table: "Ingredients");

            migrationBuilder.RenameColumn(
                name: "ItemGroup",
                table: "ItemGroups",
                newName: "ingredientId");

            migrationBuilder.RenameIndex(
                name: "IX_ItemGroups_ItemGroup",
                table: "ItemGroups",
                newName: "IX_ItemGroups_ingredientId");

            migrationBuilder.RenameColumn(
                name: "Ingredient",
                table: "Ingredients",
                newName: "itemId");

            migrationBuilder.RenameIndex(
                name: "IX_Ingredients_Ingredient",
                table: "Ingredients",
                newName: "IX_Ingredients_itemId");

            migrationBuilder.AddColumn<string>(
                name: "itemGroupId",
                table: "Items",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ingredientTypeId",
                table: "Ingredients",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_itemGroupId",
                table: "Items",
                column: "itemGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_ingredientTypeId",
                table: "Ingredients",
                column: "ingredientTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_IngredientTypes_ingredientTypeId",
                table: "Ingredients",
                column: "ingredientTypeId",
                principalTable: "IngredientTypes",
                principalColumn: "ingredientTypeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_Items_itemId",
                table: "Ingredients",
                column: "itemId",
                principalTable: "Items",
                principalColumn: "itemId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemGroups_Ingredients_ingredientId",
                table: "ItemGroups",
                column: "ingredientId",
                principalTable: "Ingredients",
                principalColumn: "ingredientId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_ItemGroups_itemGroupId",
                table: "Items",
                column: "itemGroupId",
                principalTable: "ItemGroups",
                principalColumn: "itemGroupId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

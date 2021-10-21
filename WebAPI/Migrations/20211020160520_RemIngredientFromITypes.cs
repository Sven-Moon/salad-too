using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class RemIngredientFromITypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Ingredientid",
                table: "IngredientTypes",
                type: "nvarchar(450)",
                nullable: true);

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
    }
}

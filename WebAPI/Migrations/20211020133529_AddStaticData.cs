using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class AddStaticData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "DrinkTypes",
                newName: "drinkTypeId");

            migrationBuilder.CreateTable(
                name: "IngredientTypes",
                columns: table => new
                {
                    ingredientTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    selectType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    price = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    img = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IngredientTypes", x => x.ingredientTypeId);
                });

            migrationBuilder.CreateTable(
                name: "ItemGroups",
                columns: table => new
                {
                    itemGroupId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    img = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ingredientId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemGroups", x => x.itemGroupId);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    itemId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    img = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    itemGroupId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.itemId);
                    table.ForeignKey(
                        name: "FK_Items_ItemGroups_itemGroupId",
                        column: x => x.itemGroupId,
                        principalTable: "ItemGroups",
                        principalColumn: "itemGroupId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    ingredientId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ingredientTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    img = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    itemId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.ingredientId);
                    table.ForeignKey(
                        name: "FK_Ingredients_IngredientTypes_ingredientTypeId",
                        column: x => x.ingredientTypeId,
                        principalTable: "IngredientTypes",
                        principalColumn: "ingredientTypeId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Ingredients_Items_itemId",
                        column: x => x.itemId,
                        principalTable: "Items",
                        principalColumn: "itemId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_ingredientTypeId",
                table: "Ingredients",
                column: "ingredientTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_itemId",
                table: "Ingredients",
                column: "itemId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemGroups_ingredientId",
                table: "ItemGroups",
                column: "ingredientId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_itemGroupId",
                table: "Items",
                column: "itemGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemGroups_Ingredients_ingredientId",
                table: "ItemGroups",
                column: "ingredientId",
                principalTable: "Ingredients",
                principalColumn: "ingredientId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_IngredientTypes_ingredientTypeId",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Items_itemId",
                table: "Ingredients");

            migrationBuilder.DropTable(
                name: "IngredientTypes");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "ItemGroups");

            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.RenameColumn(
                name: "drinkTypeId",
                table: "DrinkTypes",
                newName: "id");
        }
    }
}

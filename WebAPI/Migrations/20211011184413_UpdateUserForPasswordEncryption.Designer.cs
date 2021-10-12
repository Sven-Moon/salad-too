﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI.Data;

namespace WebAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20211011184413_UpdateUserForPasswordEncryption")]
    partial class UpdateUserForPasswordEncryption
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAPI.Models.DrinkType", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("price")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("DrinkTypes");
                });

            modelBuilder.Entity("WebAPI.Models.User", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("contacts")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("img")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("password")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("passwordKey")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("phoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}

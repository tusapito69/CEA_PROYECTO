﻿// <auto-generated />
using System;
using API_SERVER_CEA.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API_SERVER_CEA.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("API_SERVER_CEA.Modelo.ActivityModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("estado")
                        .HasColumnType("int");

                    b.Property<DateTime>("fecha")
                        .HasColumnType("datetime2");

                    b.Property<string>("lugar")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Activity");
                });

            modelBuilder.Entity("API_SERVER_CEA.Modelo.ImagesModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("estado")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("idActivity")
                        .HasColumnType("int");

                    b.Property<string>("ruta")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("idActivity");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("API_SERVER_CEA.Modelo.Institucion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<byte>("Estado")
                        .HasColumnType("tinyint");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tipo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Institucion");
                });

            modelBuilder.Entity("API_SERVER_CEA.Modelo.Persona", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("apellidoPersona")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("barrio_zona")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("celularPersona")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ciPersona")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("edadPersona")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte>("estadoPersona")
                        .HasColumnType("tinyint");

                    b.Property<int?>("genero")
                        .HasColumnType("int");

                    b.Property<string>("nombrePersona")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Persona");
                });

            modelBuilder.Entity("API_SERVER_CEA.Modelo.User", b =>
                {
                    b.Property<int>("idUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("idUsuario"), 1L, 1);

                    b.Property<int>("PersonaId")
                        .HasColumnType("int");

                    b.Property<string>("contraseniaUsuario")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("estadoUsuario")
                        .HasColumnType("int");

                    b.Property<string>("nombreUsuario")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("rolUsuario")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("idUsuario");

                    b.HasIndex("PersonaId");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("API_SERVER_CEA.Modelo.Visita", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<int>("ActividadId")
                        .HasColumnType("int");

                    b.Property<int>("InstitucionId")
                        .HasColumnType("int");

                    b.Property<int>("PersonaId")
                        .HasColumnType("int");

                    b.Property<int>("estado")
                        .HasColumnType("int");

                    b.Property<string>("observaciones")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("tipo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("ActividadId");

                    b.HasIndex("InstitucionId");

                    b.HasIndex("PersonaId");

                    b.ToTable("Visita");
                });

            modelBuilder.Entity("API_SERVER_CEA.Modelo.ImagesModel", b =>
                {
                    b.HasOne("API_SERVER_CEA.Modelo.ActivityModel", "Activity")
                        .WithMany("Imagenes")
                        .HasForeignKey("idActivity")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Activity");
                });

            modelBuilder.Entity("API_SERVER_CEA.Modelo.User", b =>
                {
                    b.HasOne("API_SERVER_CEA.Modelo.Persona", "Persona")
                        .WithMany()
                        .HasForeignKey("PersonaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Persona");
                });

            modelBuilder.Entity("API_SERVER_CEA.Modelo.Visita", b =>
                {
                    b.HasOne("API_SERVER_CEA.Modelo.ActivityModel", "Actividad")
                        .WithMany()
                        .HasForeignKey("ActividadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API_SERVER_CEA.Modelo.Institucion", "Institucion")
                        .WithMany()
                        .HasForeignKey("InstitucionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API_SERVER_CEA.Modelo.Persona", "Persona")
                        .WithMany()
                        .HasForeignKey("PersonaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Actividad");

                    b.Navigation("Institucion");

                    b.Navigation("Persona");
                });

            modelBuilder.Entity("API_SERVER_CEA.Modelo.ActivityModel", b =>
                {
                    b.Navigation("Imagenes");
                });
#pragma warning restore 612, 618
        }
    }
}

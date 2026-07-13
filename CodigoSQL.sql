create database locadora;
use locadora;

create table carros (
	id int auto_increment primary key,
    marca varchar(150) not null,
    modelo varchar(150) not null,
	valor float not null,
    ano year
);

create table clientes (
	id int auto_increment primary key,
    nome varchar(150) not null,
    login varchar(150) not null,
    senha varchar(150) not null
);

create table funcionarios (
	id int auto_increment primary key,
    nome varchar(150) not null,
    login varchar(150) not null,
	senha varchar(150) not null,
    total_vendas int not null,
    salario float not null
);

create table administradores (
	id int auto_increment primary key,
    nome varchar(150) not null,
    login varchar(150) not null,
	senha varchar(150) not null,
	salario float not null
);

create table vendas(
	id int auto_increment primary key,
    id_carro int not null,
    id_cliente int not null,
    desconto float,
    total_pago float not null,
    foreign key(id_carro) references carros(id),
    foreign key(id_cliente) references clientes(id)
);
CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) not null,
    senha VARCHAR(255),
    ativo BOOLEAN default true,
    criado_em timestamp default current_timestamp
);

CREATE TABLE RECEITA(
    id SERIAL PRIMARY KEY,
    nome varchar(255),
    ingredientes text not null,
    intrucoes text not null,
    tempo_preparo_minutos integer not null,
    usuario_id integer not null references usuario(id) on delete cascade
    );
CREATE TABLE superpoderes (
    id BIGSERIAL PRIMARY KEY,
    superpoder VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(250)
);

CREATE TABLE herois (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    nome_heroi VARCHAR(120) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    altura DECIMAL(5, 2) NOT NULL,
    peso DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE herois_superpoderes (
    heroi_id BIGINT NOT NULL,
    superpoder_id BIGINT NOT NULL,
    PRIMARY KEY (heroi_id, superpoder_id),
    FOREIGN KEY (heroi_id) REFERENCES herois(id) ON DELETE CASCADE,
    FOREIGN KEY (superpoder_id) REFERENCES superpoderes(id) ON DELETE CASCADE
);

CREATE INDEX idx_herois_nome_heroi ON herois(nome_heroi);
package com.viceri.herois.superhero_api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hero {
    private Long id;
    private String nome;
    private String nomeHeroi;
    private LocalDate dataNascimento;
    private Double altura;
    private Double peso;
    private List<Superpower> superpoderes;
}

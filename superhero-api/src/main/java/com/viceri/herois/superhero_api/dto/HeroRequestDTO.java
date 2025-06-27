package com.viceri.herois.superhero_api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class HeroRequestDTO {

    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 120, message = "O nome deve ter no máximo 120 caracteres")
    private String nome;

    @NotBlank(message = "Nome do herói é obrigatório")
    @Size(max = 120, message = "O nome do herói deve ter no máximo 120 caracteres.")
    private String nomeHeroi;

    @NotNull(message = "Data de nascimento é obrigatório.")
    @Past(message = "A data de nascimento deve ser no passado.")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento;

    @NotNull(message = "Altura é obrigatório.")
    @Positive(message = "A altura deve ser um valor positivo.")
    private Double altura;

    @NotNull(message = "Peso é obrigatório.")
    @Positive(message = "O peso deve ser um valor positivo.")
    private Double peso;

    @NotEmpty(message = "Um herói deve ter pelo menos um superpoder.")
    private List<Long> superpoderesIds;
}
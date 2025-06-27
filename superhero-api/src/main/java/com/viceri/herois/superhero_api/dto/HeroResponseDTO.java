package com.viceri.herois.superhero_api.dto;

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
public class HeroResponseDTO {
    private Long id;
    private String name;
    private String heroName;
    private LocalDate birthDate;
    private Double height;
    private Double weight;
    private List<SuperpowerDTO> superPowers;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
package com.viceri.herois.superhero_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SuperpowerDTO {
    private Long id;
    private String superpower;
    private String description;
}

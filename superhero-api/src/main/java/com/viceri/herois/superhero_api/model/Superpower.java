package com.viceri.herois.superhero_api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Superpower {
    private Long id;
    private String name;
    private String description;
}

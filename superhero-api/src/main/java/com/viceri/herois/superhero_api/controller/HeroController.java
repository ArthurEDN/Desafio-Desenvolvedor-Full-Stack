package com.viceri.herois.superhero_api.controller;


import com.viceri.herois.superhero_api.dto.HeroRequestDTO;
import com.viceri.herois.superhero_api.dto.HeroResponseDTO;
import com.viceri.herois.superhero_api.service.HeroService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/herois")
@Validated
@Tag(name = "Herois", description = "Endpoints para Gerenciamento de Heróis")
public class HeroController {

    private final HeroService heroService;

    public HeroController(HeroService heroService) {
        this.heroService = heroService;
    }

    @GetMapping
    @Operation(summary = "Listar todos os heróis de forma paginada")
    public ResponseEntity<Page<HeroResponseDTO>> findAll(
            @PageableDefault(size = 10, sort = "nome") Pageable pageable) {
        Page<HeroResponseDTO> heroes = heroService.findAll(pageable);
        return ResponseEntity.ok(heroes);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar herói por ID")
    public ResponseEntity<HeroResponseDTO> findById(@PathVariable Long id) {
        HeroResponseDTO hero = heroService.findById(id);
        return ResponseEntity.ok(hero);
    }

    @PostMapping
    @Operation(summary = "Criar um novo herói")
    @ApiResponse(responseCode = "201", description = "Herói criado com sucesso")
    public ResponseEntity<HeroResponseDTO> create(@RequestBody @Valid HeroRequestDTO requestDTO) {
        HeroResponseDTO createdHero = heroService.create(requestDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdHero.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdHero);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um herói existente")
    public ResponseEntity<HeroResponseDTO> update(@PathVariable Long id, @RequestBody @Valid HeroRequestDTO requestDTO) {
        HeroResponseDTO updatedHero = heroService.update(id, requestDTO);
        return ResponseEntity.ok(updatedHero);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir um herói por ID")
    @ApiResponse(responseCode = "204", description = "Herói excluído com sucesso")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        heroService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package com.viceri.herois.superhero_api.controller;

import com.viceri.herois.superhero_api.dto.SuperpowerDTO;
import com.viceri.herois.superhero_api.service.SuperpowerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/superpoderes")
@Tag(name = "Superpoderes", description = "Endpoint para Listagem de Superpoderes")
public class SuperpowerController {

    private final SuperpowerService superpowerService;

    public SuperpowerController(SuperpowerService superpowerService) {
        this.superpowerService = superpowerService;
    }

    @GetMapping
    @Operation(summary = "Listar todos os superpoderes disponíveis")
    public ResponseEntity<List<SuperpowerDTO>> findAll() {
        List<SuperpowerDTO> superpowers = superpowerService.findAll();
        return ResponseEntity.ok(superpowers);
    }
}
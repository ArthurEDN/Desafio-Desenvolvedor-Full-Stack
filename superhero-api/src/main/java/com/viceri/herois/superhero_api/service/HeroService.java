package com.viceri.herois.superhero_api.service;


import com.viceri.herois.superhero_api.dto.HeroRequestDTO;
import com.viceri.herois.superhero_api.dto.HeroResponseDTO;
import com.viceri.herois.superhero_api.dto.SuperpowerDTO;
import com.viceri.herois.superhero_api.exception.DuplicateHeroNameException;
import com.viceri.herois.superhero_api.exception.HeroNotFoundException;
import com.viceri.herois.superhero_api.exception.NoHeroesFoundException;
import com.viceri.herois.superhero_api.model.Hero;
import com.viceri.herois.superhero_api.model.Superpower;
import com.viceri.herois.superhero_api.repository.HeroRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HeroService {

    private final HeroRepository heroRepository;
    private final SuperpowerService superpowerService;

    public HeroService(HeroRepository heroRepository, SuperpowerService superpowerService) {
        this.heroRepository = heroRepository;
        this.superpowerService = superpowerService;
    }

    @Transactional(readOnly = true)
    public Page<HeroResponseDTO> findAll(Pageable pageable) {
        Page<Hero> heroesPage = heroRepository.findAll(pageable);
        if (heroesPage.isEmpty()) {
            throw new NoHeroesFoundException("Nenhum herói encontrado.");
        }
        return heroesPage.map(this::convertToResponseDTO);
    }

    @Transactional(readOnly = true)
    public HeroResponseDTO findById(Long id) {
        Hero hero = heroRepository.findById(id)
                .orElseThrow(() -> new HeroNotFoundException("Herói com ID " + id + " não encontrado."));
        return convertToResponseDTO(hero);
    }

    @Transactional
    public HeroResponseDTO create(HeroRequestDTO requestDTO) {
        if (heroRepository.existsByNomeHeroi(requestDTO.getNomeHeroi())) {
            throw new DuplicateHeroNameException("O nome de herói '" + requestDTO.getNomeHeroi() + "' já está em uso.");
        }
        Hero hero = convertToEntity(requestDTO);
        Hero savedHero = heroRepository.save(hero);
        return convertToResponseDTO(savedHero);
    }

    @Transactional
    public HeroResponseDTO update(Long id, HeroRequestDTO requestDTO) {
        heroRepository.findById(id)
                .orElseThrow(() -> new HeroNotFoundException("Herói com ID " + id + " não encontrado para atualização."));

        if (heroRepository.existsByNomeHeroiAndIdNot(requestDTO.getNomeHeroi(), id)) {
            throw new DuplicateHeroNameException("O nome de herói '" + requestDTO.getNomeHeroi() + "' já está em uso por outro herói.");
        }

        Hero heroToUpdate = convertToEntity(requestDTO);
        heroToUpdate.setId(id);

        Hero updatedHero = heroRepository.save(heroToUpdate);
        return convertToResponseDTO(updatedHero);
    }

    @Transactional
    public void delete(Long id) {
        if (heroRepository.findById(id).isEmpty()) {
            throw new HeroNotFoundException("Herói com ID " + id + " não encontrado para exclusão.");
        }
        heroRepository.deleteById(id);
    }

    private Hero convertToEntity(HeroRequestDTO dto) {
        List<Superpower> superpowers = superpowerService.findSuperpowersByIds(dto.getSuperpoderesIds());
        return Hero.builder()
                .nome(dto.getNome())
                .nomeHeroi(dto.getNomeHeroi())
                .dataNascimento(dto.getDataNascimento())
                .altura(dto.getAltura())
                .peso(dto.getPeso())
                .superpoderes(superpowers)
                .build();
    }

    private HeroResponseDTO convertToResponseDTO(Hero hero) {
        List<SuperpowerDTO> superpowerDTOs = hero.getSuperpoderes().stream()
                .map(superpower -> SuperpowerDTO.builder()
                        .id(superpower.getId())
                        .superpoder(superpower.getSuperpoder())
                        .descricao(superpower.getDescricao())
                        .build())
                .collect(Collectors.toList());

        return HeroResponseDTO.builder()
                .id(hero.getId())
                .nome(hero.getNome())
                .nomeHeroi(hero.getNomeHeroi())
                .dataNascimento(hero.getDataNascimento())
                .altura(hero.getAltura())
                .peso(hero.getPeso())
                .superpoderes(superpowerDTOs)
                .build();
    }
}

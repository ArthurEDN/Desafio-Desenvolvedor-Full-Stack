package com.viceri.herois.superhero_api.service;

import com.viceri.herois.superhero_api.dto.SuperpowerDTO;
import com.viceri.herois.superhero_api.exception.SuperpowerNotFoundException;
import com.viceri.herois.superhero_api.model.Superpower;
import com.viceri.herois.superhero_api.repository.SuperpowerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SuperpowerService {

    private final SuperpowerRepository superpowerRepository;

    public SuperpowerService(SuperpowerRepository superpowerRepository) {
        this.superpowerRepository = superpowerRepository;
    }

    @Transactional(readOnly = true)
    public List<SuperpowerDTO> findAll() {
        return superpowerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<Superpower> findSuperpowersByIds(List<Long> ids) {
        List<Superpower> foundSuperpowers = superpowerRepository.findByIds(ids);
        if (foundSuperpowers.size() != ids.size()) {
            throw new SuperpowerNotFoundException("Um ou mais IDs de superpoderes não foram encontrados.");
        }
        return foundSuperpowers;
    }

    private SuperpowerDTO convertToDTO(Superpower superpower) {
        return SuperpowerDTO.builder()
                .id(superpower.getId())
                .superpoder(superpower.getSuperpoder())
                .descricao(superpower.getDescricao())
                .build();
    }
}
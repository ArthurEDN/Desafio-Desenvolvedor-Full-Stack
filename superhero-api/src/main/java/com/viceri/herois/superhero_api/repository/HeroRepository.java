package com.viceri.herois.superhero_api.repository;


import com.viceri.herois.superhero_api.model.Hero;
import com.viceri.herois.superhero_api.model.Superpower;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class HeroRepository {

    private final JdbcTemplate jdbcTemplate;
    private final SuperpowerRepository superpowerRepository;

    public HeroRepository(JdbcTemplate jdbcTemplate, SuperpowerRepository superpowerRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.superpowerRepository = superpowerRepository;
    }

    public Page<Hero> findAll(Pageable pageable) {
        String countSql = "SELECT COUNT(*) FROM herois";
        Integer total = jdbcTemplate.queryForObject(countSql, Integer.class);
        List<String> allowedSortColumns = List.of("id", "nome", "nome_heroi");
        String sortClause = pageable.getSort().isEmpty()
                ? "id ASC"
                : pageable.getSort().stream()
                .filter(order -> allowedSortColumns.contains(order.getProperty()))
                .map(order -> order.getProperty() + " " + order.getDirection())
                .collect(Collectors.joining(", "));


        String dataSql = "SELECT * FROM herois ORDER BY " + sortClause + " LIMIT ? OFFSET ?";

        List<Hero> heroes = jdbcTemplate.query(
                dataSql,
                this::mapRowToHero,
                pageable.getPageSize(),
                pageable.getOffset()
        );

        if (!heroes.isEmpty()) {
            loadSuperpowersForHeroes(heroes);
        }

        return new PageImpl<>(heroes, pageable, total != null ? total : 0);
    }

    public Optional<Hero> findById(Long id) {
        String sql = "SELECT * FROM herois WHERE id = ?";

        try {
           Hero hero = jdbcTemplate.queryForObject(sql, this::mapRowToHero, id);
            if (hero != null) {
                hero.setSuperpoderes(findSuperpowersByHeroId(id));
            }
            return Optional.ofNullable(hero);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public boolean existsByNomeHeroi(String nomeHeroi) {
        String sql = "SELECT COUNT(*) FROM herois WHERE nome_heroi = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, nomeHeroi);
        return count != null && count > 0;
    }

    public boolean existsByNomeHeroiAndIdNot(String nomeHeroi, Long id) {
        String sql = "SELECT COUNT(*) FROM herois WHERE nome_heroi = ? AND id != ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, nomeHeroi, id);
        return count != null && count > 0;
    }

    public Hero save(Hero hero) {
        if (hero.getId() == null) {
            return insert(hero);
        } else {
            return update(hero);
        }
    }

    public void deleteById(Long id) {
        deleteHeroSuperpowers(id);
        String sql = "DELETE FROM herois WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private Hero insert(Hero hero) {
        String sql = "INSERT INTO herois (nome, nome_heroi, data_nascimento, altura, peso) " +
                "VALUES (?, ?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, hero.getNome());
            ps.setString(2, hero.getNomeHeroi());
            ps.setDate(3, java.sql.Date.valueOf(hero.getDataNascimento()));
            ps.setDouble(4, hero.getAltura());
            ps.setDouble(5, hero.getPeso());
            return ps;
        }, keyHolder);

        if (keyHolder.getKeys() != null && keyHolder.getKeys().containsKey("id")) {
            long newId = ((Number) keyHolder.getKeys().get("id")).longValue();
            hero.setId(newId);
            saveHeroSuperpowers(newId, hero.getSuperpoderes());
        } else {
            throw new IllegalStateException("Could not retrieve generated ID for hero.");
        };

        return hero;
    }

    private Hero update(Hero hero) {
        String sql = "UPDATE herois SET nome = ?, nome_heroi = ?, data_nascimento = ?, altura = ?, peso = ? WHERE id = ?";

        jdbcTemplate.update(sql,
                hero.getNome(),
                hero.getNomeHeroi(),
                hero.getDataNascimento(),
                hero.getAltura(),
                hero.getPeso(),
                hero.getId());

        deleteHeroSuperpowers(hero.getId());
        saveHeroSuperpowers(hero.getId(), hero.getSuperpoderes());

        return hero;
    }

    private void loadSuperpowersForHeroes(List<Hero> heroes) {
        List<Long> heroIds = heroes.stream().map(Hero::getId).toList();
        if (heroIds.isEmpty()) {
            return;
        }
        String inSql = String.join(",", Collections.nCopies(heroIds.size(), "?"));
        String sql = String.format("SELECT hs.heroi_id, s.* FROM superpoderes s INNER JOIN herois_superpoderes hs ON s.id = hs.superpoder_id WHERE hs.heroi_id IN (%s)", inSql);

        Map<Long, List<Superpower>> superpowersByHeroId = new HashMap<>();
        jdbcTemplate.query(sql, rs -> {
            Long heroId = rs.getLong("heroi_id");
            Superpower superpower = superpowerRepository.mapRowToSuperpower(rs, rs.getRow());
            superpowersByHeroId.computeIfAbsent(heroId, k -> new ArrayList<>()).add(superpower);
        }, heroIds.toArray());

        heroes.forEach(hero -> hero.setSuperpoderes(superpowersByHeroId.getOrDefault(hero.getId(), Collections.emptyList())));
    }

    private List<Superpower> findSuperpowersByHeroId(Long heroId) {
        String sql = "SELECT s.* FROM superpoderes s INNER JOIN herois_superpoderes hs ON s.id = hs.superpoder_id WHERE hs.heroi_id = ?";
        return jdbcTemplate.query(sql, superpowerRepository::mapRowToSuperpower, heroId);
    }

    private void saveHeroSuperpowers(Long heroId, List<Superpower> superpowers) {
        if (superpowers != null && !superpowers.isEmpty()) {
            String sql = "INSERT INTO herois_superpoderes (heroi_id, superpoder_id) VALUES (?, ?)";
            List<Object[]> batchArgs = superpowers.stream()
                    .map(sp -> new Object[]{heroId, sp.getId()})
                    .collect(Collectors.toList());
            jdbcTemplate.batchUpdate(sql, batchArgs);
        }
    }

    private void deleteHeroSuperpowers(Long heroId) {
        String sql = "DELETE FROM herois_superpoderes WHERE heroi_id = ?";
        jdbcTemplate.update(sql, heroId);
    }

    private Hero mapRowToHero(ResultSet rs, int rowNum) throws SQLException {
        return Hero.builder()
                .id(rs.getLong("id"))
                .nome(rs.getString("nome"))
                .nomeHeroi(rs.getString("nome_heroi"))
                .dataNascimento(rs.getObject("data_nascimento", LocalDate.class))
                .altura(rs.getBigDecimal("altura").doubleValue())
                .peso(rs.getBigDecimal("peso").doubleValue())
                .build();
    }
}
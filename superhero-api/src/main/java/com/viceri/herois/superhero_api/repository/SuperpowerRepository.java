package com.viceri.herois.superhero_api.repository;

import com.viceri.herois.superhero_api.model.Superpower;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
public class SuperpowerRepository {

    private final JdbcTemplate jdbcTemplate;

    public SuperpowerRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Superpower> findAll() {
        String sql = "SELECT * FROM superpoderes ORDER BY superpoder";
        return jdbcTemplate.query(sql, this::mapRowToSuperpower);
    }

    public List<Superpower> findByIds(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return Collections.emptyList();
        }
        String inSql = String.join(",", Collections.nCopies(ids.size(), "?"));
        String sql = String.format("SELECT * FROM superpoderes WHERE id IN (%s)", inSql);
        return jdbcTemplate.query(sql, this::mapRowToSuperpower, ids.toArray());
    }

    public Optional<Superpower> findById(Long id) {
        String sql = "SELECT * FROM superpoderes WHERE id = ?";
        try {
            Superpower superpower = jdbcTemplate.queryForObject(sql, this::mapRowToSuperpower, id);
            return Optional.ofNullable(superpower);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Superpower mapRowToSuperpower(ResultSet rs, int rowNum) throws SQLException {
        return Superpower.builder()
                .id(rs.getLong("id"))
                .superpoder(rs.getString("superpoder"))
                .descricao(rs.getString("descricao"))
                .build();
    }
}
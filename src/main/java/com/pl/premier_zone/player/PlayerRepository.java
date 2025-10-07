package com.pl.premier_zone.player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    void deleteByName(String name);
    
    Optional<Player> findByName(String name);



}

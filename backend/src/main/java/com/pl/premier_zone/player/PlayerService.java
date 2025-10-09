package com.pl.premier_zone.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;


    @Autowired
    public PlayerService(PlayerRepository playerRepository){
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers(){
        return playerRepository.findAll();
    }

    public List<Player> getPlayersByTeam(String teamName){
        return playerRepository.findAll().stream().filter(player -> teamName.equals(player.getTeam())).collect(Collectors.toList());
    }

    public List<Player> getPlayerByName(String searchText){
        return playerRepository.findAll().stream().filter(player-> player.getName().toLowerCase().contains(searchText.toLowerCase())).collect(Collectors.toList());
    }

    public List<Player> getPlayersByPosition(String searchText){
        return playerRepository.findAll().stream().filter(player -> player.getPosition().toLowerCase().contains(searchText.toLowerCase())).collect(Collectors.toList());
    }


    public List<Player> getPlayersByNation(String searchText){
        return playerRepository.findAll().stream().filter(player -> player.getNation().toLowerCase().contains(searchText.toLowerCase())).collect(Collectors.toList());
    }
    
    public List<Player> getPlayersByTeamandPosition(String team, String position){
        return playerRepository.findAll().stream().filter(player -> team.equals(player.getTeam()) && position.equals(player.getPosition())).collect(Collectors.toList());
    }

    public Player addPlayer(Player player){
        playerRepository.save(player);
        return player;
    }

    public Player updatePlayer(Player updatedPlayer){
        Optional<Player> existingPlayer = playerRepository.findById(updatedPlayer.getId());

        if (existingPlayer.isPresent()){
            Player playertoUpdate = existingPlayer.get();
            playertoUpdate.setName(updatedPlayer.getName());
            playertoUpdate.setPosition(updatedPlayer.getPosition());
            playertoUpdate.setNation(updatedPlayer.getNation());

            playerRepository.save(playertoUpdate);
            return playertoUpdate;

        }
        return null;
    }
    @Transactional
    public void deletePlayer(Long playerId){
        playerRepository.deleteById(playerId);
    }
    
    }
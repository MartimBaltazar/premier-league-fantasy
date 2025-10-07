package com.pl.premier_zone.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

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

    public List<Player> getPlayersFromTeam(String teamName){
        return playerRepository.findAll().stream().filter(player -> teamName.equals(player.getTeam())).collect(Collectors.toList());
    }

    public List<Player> getPlayerByName(String searchText){
        return playerRepository.findAll().stream().filter(player-> player.getName().toLowerCase().contains(searchText.toLowerCase())).collect(Collectors.toList());
    }

    public List<Player> getPlayersByPosition(String searchText){
        return playerRepository.findAll().stream(player -> player.getPosition().toLowerCase().contains(searchText.toLowerCase())).collect(Collector.toList());
    }


    public List<Player> getPlayersByNation(String searchText){
        return playerRepository.findAll().stream(player -> player.getNation().toLowerCase().contains(searchText.toLowerCase())).collect(Collector.toList());
    }
    
    public List<Player> getPlayersByTeamandPosition(String team, String position){
        return playerRepository.findAll().stream(player -> team.equals(player.getTeam()) && position.equals(player.getPosition()));
    }

    public Player addPlayer(Player player){
        playerRepository.save(player);
        return player;
    }

    public Player updatePlayer(Player updatedPlayer){
        Optional<Player> existingPlayer = playerRepository.findById(updatedPlayer.getId());

        if (existingPlayer.isPresent()){
            player playerUpdated = existingPlayer.get();
            playertoUpdate.setName(updatedPlayer.getName());
            playertoUpdate.setName(updatedPlayer.getName());
            playertoUpdate.setName(updatedPlayer.getName());

            playerRepository.save(playertoUpdate);
            return playertoUpdate;

        }
        return null;
    }
    @Transactional
    public void deletePlayer(Player playerToDelete){
        playerRepository.deleteById(playerToDelete.getId());
    }
    
    }
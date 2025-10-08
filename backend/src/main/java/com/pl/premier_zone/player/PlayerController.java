package com.pl.premier_zone.player;


@RestController
@RequestMapping(path = "api/v1/player")
public class PlayerController{
    private final playerService playerService;

    @Autowired
    public PlayerController(playerService playerService){
        this.playerService = playerService
    }


    @GetMapping
    public List<Player> getPlayer(requestParam(required = false) String team,
                                    requestParam(required = false) String name,
                                    requestParam(required = false) String position,
                                    requestParam(required = false) String nation)
    {
        if (team != nulll && position != null){
            return playerService.getPlayersByTeamandPosition(team,position);
        }
        else if ( team != null){
            return playerService.getPlayerByTeam(team);
        }
        else if (name != null){
            return playerService.getPlayerbyName(name)
        }
        else if (position != null){
            return playerService.getPlayersbyPos(position)
        }
        else if (nation != null) {
            return playerService.getPlayersByNation(nation);
        } else {
            return playerService.getPlayers();
        }
    }

    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody Player player){
        Player createdPlayer = playerService.addPlayer(player);
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Player> updatedPlayer(@RequestBody Player player){
        Player resultPlayer = playerService.updatedPlayer(player);
        if (resultPlayer){
            return new ResponseEntity<>(resultPlayer,HttpStatus.OK)
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND)
        }

    @DeleteMapping("/{playerName}")
    public ResponseEntity<String> deletePlayer(@PathVariable String playerName) {
        playerService.deletePlayer(playerName);
        return new ResponseEntity<>("Player deleted successfully", HttpStatus.OK);
    }

    

}
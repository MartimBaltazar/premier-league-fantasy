import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "players_stats")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String nation;
    private String position;
    private String team;
    private Float age;
    private Float born;
    private Integer played;
    private Integer starts;
    private Integer minutes;
    private Integer goals;
    private Integer assists;
    private Integer penaltyKicks;
    private Integer penaltyKicksAttempts;
    private Integer yellow;
    private Integer red;
    private Float expectedGoals;
    private Integer progressiveCarries;
    private Integer progressivePasses;
    private Integer receivedProgressivePasses;
}

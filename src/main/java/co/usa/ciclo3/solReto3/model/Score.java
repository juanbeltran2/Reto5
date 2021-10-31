package co.usa.ciclo3.solReto3.model;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="Score")
public class Score implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer valScore;
    private String message;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="reserva", referencedColumnName = "idReservation")
    private Reservation reserva;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getValScore() {
        return valScore;
    }

    public void setValScore(Integer valScore) {
        this.valScore = valScore;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Reservation getReserva() {
        return reserva;
    }

    public void setReserva(Reservation reserva) {
        this.reserva = reserva;
    }
    
    
}

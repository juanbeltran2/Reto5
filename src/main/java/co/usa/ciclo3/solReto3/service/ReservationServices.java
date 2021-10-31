package co.usa.ciclo3.solReto3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.ciclo3.solReto3.model.Reservation;
import co.usa.ciclo3.solReto3.repository.ReservationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationServices {
    
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation p){
        if(p.getIdReservation()==null){
            return reservationRepository.save(p);
        }else{
            Optional<Reservation> paux=reservationRepository.getReservation(p.getIdReservation());
            if(paux.isEmpty()){
                return reservationRepository.save(p);
            }else{
                return p;
            }
        }
    }

    public boolean deleteReservation(int id){
        Boolean d=getReservation(id).map(p -> {
            reservationRepository.delete(p);
            return true;
        }).orElse(false);
        return d;
    }

    public Reservation update(Reservation p){
        if(p.getIdReservation()!=null){
            Optional<Reservation>g=reservationRepository.getReservation(p.getIdReservation());
            if(!g.isEmpty()){
                if(p.getStartDate()!=null){
                    g.get().setStartDate(p.getStartDate());
                }
                if(p.getDevolutionDate()!=null){
                    g.get().setDevolutionDate(p.getDevolutionDate());
                }
                if(p.getStatus()!=null){
                    g.get().setStatus(p.getStatus());
                }
                return reservationRepository.save(g.get());
            }
        }
        return p;
    }
}

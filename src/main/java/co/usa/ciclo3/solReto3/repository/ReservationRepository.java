package co.usa.ciclo3.solReto3.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.ciclo3.solReto3.model.Reservation;
import co.usa.ciclo3.solReto3.repository.crud.ReservationCrudRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class ReservationRepository {
    
    @Autowired
    private ReservationCrudRepository ReservationCrudRepository;

    public List<Reservation> getAll(){
        return (List<Reservation>) ReservationCrudRepository.findAll();
    }

    public Optional<Reservation> getReservation(int id){
        return  ReservationCrudRepository.findById(id);
    }

    public Reservation save(Reservation p){
        return ReservationCrudRepository.save(p);
    }

    public void delete(Reservation p){
        ReservationCrudRepository.delete(p);
    }


}

package co.usa.ciclo3.solReto3.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.ciclo3.solReto3.model.Client;
import co.usa.ciclo3.solReto3.model.Reservation;
import co.usa.ciclo3.solReto3.repository.crud.ReservationCrudRepository;

import java.util.ArrayList;
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
    
    
    public List<Reservation> ReservacionStatusRepositorio (String status){
        return ReservationCrudRepository.findAllByStatus(status);
    }
    
    public List<Reservation> ReservacionTiempoRepositorio (Date a, Date b){
        return ReservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(a, b);    
    }
    
    
    public List<CountClient> getClientesRepositorio(){
        List<CountClient> res = new ArrayList<>();
        List<Object[]> report = ReservationCrudRepository.countTotalReservationsByClient();
        for(int i=0; i<report.size(); i++){
            res.add(new CountClient ((Long)report.get(i)[1],(Client)report.get(i)[0]));
        }
        return res;
    }

}

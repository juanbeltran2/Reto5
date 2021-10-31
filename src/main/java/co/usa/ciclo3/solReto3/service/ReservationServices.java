package co.usa.ciclo3.solReto3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.ciclo3.solReto3.model.Reservation;
import co.usa.ciclo3.solReto3.repository.CountClient;
import co.usa.ciclo3.solReto3.repository.ReservationRepository;
import co.usa.ciclo3.solReto3.repository.StatusReservation;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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




    
    
    public StatusReservation reporteStatusServicio (){
        List<Reservation>completed= reservationRepository.ReservacionStatusRepositorio("completed");
        List<Reservation>cancelled= reservationRepository.ReservacionStatusRepositorio("cancelled");
        
        return new StatusReservation(completed.size(), cancelled.size() );
    }

    public List<Reservation> reporteTiempoServicio (String datoA, String datoB){
        SimpleDateFormat parser = new SimpleDateFormat ("yyyy-MM-dd");
        
        Date datoUno = new Date();
        Date datoDos = new Date();
        
        try{
            datoUno = parser.parse(datoA);
            datoDos = parser.parse(datoB);
        }catch(ParseException evt){
            evt.printStackTrace();
        }if(datoUno.before(datoDos)){
            return reservationRepository.ReservacionTiempoRepositorio(datoUno, datoDos);
        }else{
            return new ArrayList<>();
        
        } 
    }

    public List<CountClient> reporteClientesServicio(){
        return reservationRepository.getClientesRepositorio();
    } 
}

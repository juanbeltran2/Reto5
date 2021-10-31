package co.usa.ciclo3.solReto3.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import co.usa.ciclo3.solReto3.model.Reservation;
import co.usa.ciclo3.solReto3.repository.CountClient;
import co.usa.ciclo3.solReto3.repository.StatusReservation;
import co.usa.ciclo3.solReto3.service.ReservationServices;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class ReservationController {

    @Autowired
    private ReservationServices reservationServices;

    @GetMapping("/all")
    public List<Reservation> getReservations(){
        return reservationServices.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable("id") int id){
        return reservationServices.getReservation(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation p){
        return reservationServices.save(p);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return reservationServices.deleteReservation(id);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation p){
        return reservationServices.update(p);
    }

    
    
    
    
    
    
    
    
    
    
    @GetMapping("/report-status")
    public StatusReservation getReservas(){
        return reservationServices.reporteStatusServicio();
    }
    
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getReservasTiempo (@PathVariable("dateOne")String dateOne, @PathVariable("dateTwo")String dateTwo ){
        return reservationServices.reporteTiempoServicio(dateOne, dateTwo);
    }
    
    @GetMapping("/report-clients")
    public List<CountClient> getClientes(){
        return reservationServices.reporteClientesServicio();
    }

}

package co.usa.ciclo3.solReto3.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.ciclo3.solReto3.model.Farm;
import co.usa.ciclo3.solReto3.repository.crud.FarmCrudRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class FarmRepository {

    @Autowired
    private FarmCrudRepository farmCrudRepository;

    public List<Farm> getAll(){
        return (List<Farm>) farmCrudRepository.findAll();
    }

    public Optional<Farm> getFarm(int id){
        return farmCrudRepository.findById(id);
    }

    public Farm save(Farm p){
        return farmCrudRepository.save(p);
    }

    public void delete(Farm p){
        farmCrudRepository.delete(p);
    }
    
}

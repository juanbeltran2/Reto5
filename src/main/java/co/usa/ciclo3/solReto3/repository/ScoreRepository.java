package co.usa.ciclo3.solReto3.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.ciclo3.solReto3.model.Score;
import co.usa.ciclo3.solReto3.repository.crud.ScoreCrudRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class ScoreRepository {

    @Autowired
    private ScoreCrudRepository scoreCrudRepository;

    public List<Score> getAll(){
        return (List<Score>) scoreCrudRepository.findAll();
    }

    public Optional<Score> getScore(int id){
        return  scoreCrudRepository.findById(id);
    }

    public Score save(Score p){
        return scoreCrudRepository.save(p);
    }

    public void delete(Score p){
        scoreCrudRepository.delete(p);
    }
    
}

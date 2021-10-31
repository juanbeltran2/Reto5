package co.usa.ciclo3.solReto3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.ciclo3.solReto3.model.Score;
import co.usa.ciclo3.solReto3.repository.ScoreRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreServices {

    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id){
        return scoreRepository.getScore(id);
    }

    public Score save(Score p){
        if(p.getId()==null){
            return scoreRepository.save(p);
        }else{
            Optional<Score> paux=scoreRepository.getScore(p.getId());
            if(paux.isEmpty()){
                return scoreRepository.save(p);
            }else{
                return p;
            }
        }
    }

    public boolean deleteScore(int id){
        Boolean d=getScore(id).map(p -> {
            scoreRepository.delete(p);
            return true;
        }).orElse(false);
        return d;
    }

    public Score update(Score p){
        if(p.getId()!=null){
            Optional<Score>g=scoreRepository.getScore(p.getId());
            if(!g.isEmpty()){
                if(p.getValScore()!=null){
                    g.get().setValScore(p.getValScore());
                }
                if(p.getMessage()!=null){
                    g.get().setMessage(p.getMessage());
                }
                return scoreRepository.save(g.get());
            }
        }
        return p;
    }
}

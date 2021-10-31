package co.usa.ciclo3.solReto3.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.ciclo3.solReto3.model.Category;
import co.usa.ciclo3.solReto3.repository.crud.CategoryCrudRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class CategoryRepository {

    @Autowired
    private CategoryCrudRepository categoryCrudRepository;

    public List<Category> getAll(){
        return (List<Category>) categoryCrudRepository.findAll();
    }

    public Optional<Category> getCategory(int id){
        return  categoryCrudRepository.findById(id);
    }

    public Category save(Category p){
        return categoryCrudRepository.save(p);
    }    

    public void delete(Category p){
        categoryCrudRepository.delete(p);
    }

}

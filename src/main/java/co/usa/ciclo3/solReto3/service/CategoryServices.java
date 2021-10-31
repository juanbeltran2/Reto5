package co.usa.ciclo3.solReto3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.ciclo3.solReto3.model.Category;
import co.usa.ciclo3.solReto3.repository.CategoryRepository;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServices {
    
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll(){
        return categoryRepository.getAll();
    }

    public Optional<Category> getCategory(int id){
        return categoryRepository.getCategory(id);
    }

    public Category save(Category p){
        if(p.getId()==null){
            return categoryRepository.save(p);
        }else{
            Optional<Category> paux=categoryRepository.getCategory(p.getId());
            if(paux.isEmpty()){
                return categoryRepository.save(p);
            }else{
                return p;
            }
        }
    }

    public boolean deleteCategory(int id){
        Boolean d=getCategory(id).map(p -> {
            categoryRepository.delete(p);
            return true;
        }).orElse(false);
        return d;
    }

    public Category update(Category p){
        if(p.getId()!=null){
            Optional<Category>g=categoryRepository.getCategory(p.getId());
            if(!g.isEmpty()){
                if(p.getDescription()!=null){
                    g.get().setDescription(p.getDescription());
                }
                if(p.getName()!=null){
                    g.get().setName(p.getName());
                }
                return categoryRepository.save(g.get());
            }
        }
        return p;
    }

}

package co.usa.ciclo3.solReto3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.ciclo3.solReto3.model.Client;
import co.usa.ciclo3.solReto3.repository.ClientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServices {
    
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll(){
        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int id){
        return clientRepository.getClient(id);
    }

    public Client save(Client p){
        if(p.getIdClient()==null){
            return clientRepository.save(p);
        }else{
            Optional<Client> paux=clientRepository.getClient(p.getIdClient());
            if(paux.isEmpty()){
                return clientRepository.save(p);
            }else{
                return p;
            }
        }
    }

    public boolean deleteClient(int id){
        Boolean d=getClient(id).map(p -> {
            clientRepository.delete(p);
            return true;
        }).orElse(false);
        return d;
    }

    public Client update(Client p){
        if(p.getIdClient()!=null){
            Optional<Client>g=clientRepository.getClient(p.getIdClient());
            if(!g.isEmpty()){
                if(p.getEmail()!=null){
                    g.get().setEmail(p.getEmail());
                }
                if(p.getPassword()!=null){
                    g.get().setPassword(p.getPassword());
                }
                if(p.getName()!=null){
                    g.get().setName(p.getName());
                }
                if(p.getAge()!=null){
                    g.get().setAge(p.getAge());
                }
                return clientRepository.save(g.get());
            }
        }
        return p;
    }
}

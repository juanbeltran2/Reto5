package co.usa.ciclo3.solReto3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.ciclo3.solReto3.model.Message;
import co.usa.ciclo3.solReto3.repository.MessageRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MessageServices {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){
        return messageRepository.getAll();
    }

    public Optional<Message> getMessage(int id){
        return messageRepository.getMessage(id);
    }

    public Message save(Message p){
        if(p.getIdMessage()==null){
            return messageRepository.save(p);
        }else{
            Optional<Message> paux=messageRepository.getMessage(p.getIdMessage());
            if(paux.isEmpty()){
                return messageRepository.save(p);
            }else{
                return p;
            }
        }
    }

    public boolean deleteMessage(int id){
        Boolean d=getMessage(id).map(p -> {
            messageRepository.delete(p);
            return true;
        }).orElse(false);
        return d;
    }

    public Message update(Message p){
        if(p.getIdMessage()!=null){
            Optional<Message>g=messageRepository.getMessage(p.getIdMessage());
            if(!g.isEmpty()){
                if(p.getMessageText()!=null){
                    g.get().setMessageText(p.getMessageText());
                }                
                return messageRepository.save(g.get());
            }
        }
        return p;
    }

}

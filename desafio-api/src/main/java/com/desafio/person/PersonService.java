package com.desafio.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public Person save (Person person){
        return this.personRepository.save(person);
    }

    public List<Person> findAll(){
        return this.personRepository.findAll();
    }

    public Optional<Person> findById(Long id) {
        return this.personRepository.findById(id);
    }

    public void delete(Person person) {
        this.personRepository.delete(person);
    }

    public Optional<Person> findByCpf(String cpf) {
        return this.personRepository.findByCpf(cpf);
    }
}
package com.desafio.person;

import com.desafio.exception.EntityNotFoundException;
import com.desafio.exception.PersonExistsException;
import com.desafio.response.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(value="/api/person")
@CrossOrigin(origins = "*")
public class PersonController {
    private static final Logger log = LoggerFactory.getLogger(Person.class);

    @Autowired
    private PersonService personService;


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Response<Person>> create(@Valid @RequestBody Person obj, BindingResult result){
        log.info("Cadastrando pessoa {}", obj);
        Response<Person> response = new Response<>();
        if(result.hasErrors()){
            log.error("Erro ao cadastrar pessoa");
            result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(response);
        }
        Optional<Person> personOpt = this.personService.findByCpf(obj.getCpf());
        if (personOpt.isPresent()){
            throw new PersonExistsException(Person.class, obj.getCpf());
        }
        obj = this.personService.save(obj);
        response.setData(obj);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Response<List<Person>>> findAll(){
        log.info("Buscando todos as pessoas {}");
        Response<List<Person>> response = new Response<>();
        List<Person> listPerson = this.personService.findAll();
        response.setData(listPerson);
        return ResponseEntity.ok(response);
    }


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Response<Person>> findById(@PathVariable("id") Long id) {
        log.info("Buscando pessoa por ID: {}", id);
        Response<Person> response = new Response<Person>();
        Optional<Person> person = this.personService.findById(id);
        if (!person.isPresent()) {
            throw new EntityNotFoundException(Person.class, id);
        }
        response.setData(person.get());
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE,  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Response<Person>> update(@PathVariable("id") Long id, @Valid @RequestBody Person person, BindingResult result){
        person.setId(id);
        log.info("Atualizando a pessoa: {}", person.toString());
        Response<Person> response = new Response<Person>();
        Optional<Person> personOpt = this.personService.findById(id);
        if (!personOpt.isPresent()) {
            throw new EntityNotFoundException(Person.class, id);
        }
        Person updatedPerson = this.personService.save(person);
        response.setData(updatedPerson);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deletePerson(@PathVariable("id") Long id) {
        log.info("Deletando a pessoa por ID: {}", id);
        Optional<Person> person = this.personService.findById(id);
        if (!person.isPresent()) {
            throw new EntityNotFoundException(Person.class, id);
        }
        this.personService.delete(person.get());
    }

}



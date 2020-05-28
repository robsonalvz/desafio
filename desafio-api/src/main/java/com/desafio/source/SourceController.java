package com.desafio.source;

import com.desafio.person.Person;
import com.desafio.response.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/source")
@CrossOrigin(origins = "*")
public class SourceController {

    private static final Logger log = LoggerFactory.getLogger(Person.class);

    @Value("${repository_url}")
    private String repository;

    @GetMapping
    public ResponseEntity<Response<String>> findAll(){
        log.info("Procurando repositório do projeto {}");
        Response<String> response = new Response<>();
        response.setData(repository);
        return ResponseEntity.ok(response);
    }
}

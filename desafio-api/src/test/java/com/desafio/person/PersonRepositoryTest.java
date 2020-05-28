package com.desafio.person;


import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class PersonRepositoryTest {

    @Autowired
    private PersonRepository personRepository;

    private static final String CPF = "06454049507";
    private static final String NAME = "Person X";
    private static final String EMAIL = "robs.alvz@gmail.com";
    private static final String GENDER = "male";
    private static final Date DATE_OF_BIRTH = new Date();
    private static final String NATIONALITY = "brasilian";
    private static final String NATURALNESS = "baiano";

    @Before
    public void setUp() throws Exception {
        this.personRepository.save(obterDadosPerson());
    }

    @After
    public final void tearDown() {
        this.personRepository.deleteAll();
    }

    @Test
    public void testFindByCpf() {
        Optional<Person> personOpt = this.personRepository.findByCpf(CPF);
        assertEquals(CPF, personOpt.get().getCpf());
    }


    private Person obterDadosPerson() {
        Person person = new Person();
        person.setName(NAME);
        person.setEmail(EMAIL);
        person.setCpf(CPF);
        person.setDateOfBirth(DATE_OF_BIRTH);
        person.setGender(GENDER);
        person.setNationality(NATIONALITY);
        person.setNaturalness(NATURALNESS);
        return person;
    }
}

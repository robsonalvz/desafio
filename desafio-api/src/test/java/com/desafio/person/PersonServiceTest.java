package com.desafio.person;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class PersonServiceTest {

    @MockBean
    private PersonRepository personRepository;

    @Autowired
    private PersonService personService;

    private static final String CPF = "06454049507";

    @Before
    public void setUp() throws Exception {
        BDDMockito.given(this.personRepository.findByCpf(Mockito.anyString())).willReturn(Optional.of(new Person()));
        BDDMockito.given(this.personRepository.save(Mockito.any(Person.class))).willReturn(new Person());
    }

    @Test
    public void testSavePerson() {
        Person person = this.personService.save(new Person());
        assertNotNull(person);
    }

    @Test
    public void testFindByCpf() {
        Optional<Person> person = this.personService.findByCpf(CPF);
        assertTrue(person.isPresent());
    }

}

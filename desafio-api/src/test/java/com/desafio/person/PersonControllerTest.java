package com.desafio.person;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class PersonControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private PersonService personService;

    private static final String PERSON_ENDPOINT = "/api/person/";

    private static final Long ID = Long.valueOf(1);
    private static final String CPF = "06454049507";
    private static final String NAME = "Person X";
    private static final String EMAIL = "robs.alvz@gmail.com";
    private static final String GENDER = "male";
    private static final Date DATE_OF_BIRTH = new Date();
    private static final String NATIONALITY = "brasileiro";
    private static final String NATURALNESS = "baiano";

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

    private Person getPersonData() {
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

    @Before
    public void testLoginUser() throws Exception {
        this.mvc.perform(get(PERSON_ENDPOINT).with(httpBasic("admin", "admin")))
                .andExpect(authenticated());
    }

    @Test
    @WithMockUser
    public void testNotFound() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get(PERSON_ENDPOINT + ID).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    public void testCreate() throws Exception {
        Person person = getPersonData();
        BDDMockito.given(this.personService.save(Mockito.any(Person.class))).willReturn(person);

        mvc.perform(MockMvcRequestBuilders.post(PERSON_ENDPOINT)
                .content(this.getJsonRequestPost())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.cpf").value(CPF))
                .andExpect(jsonPath("$.data.name").value(NAME))
                .andExpect(jsonPath("$.data.email").value(EMAIL))
                .andExpect(jsonPath("$.data.gender").value(GENDER))
                .andExpect(jsonPath("$.data.dateOfBirth").value(this.dateFormat.format(DATE_OF_BIRTH)))
                .andExpect(jsonPath("$.data.nationality").value(NATIONALITY))
                .andExpect(jsonPath("$.data.naturalness").value(NATURALNESS))
                .andExpect(jsonPath("$.errors").isEmpty());
    }

    private String getJsonRequestPost() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(getPersonData());
        System.out.println(json);
        return json;
    }
}

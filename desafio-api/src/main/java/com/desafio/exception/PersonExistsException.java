package com.desafio.exception;

public class PersonExistsException extends RuntimeException {
    public PersonExistsException(Class tClass, String cpf){
        super("Pessoa já existe para o cpf " + cpf + "");
    }
}

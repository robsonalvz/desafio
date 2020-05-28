package com.desafio.exception;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(Class tClass, Long id){
        super(tClass.getSimpleName() + " não encontrada para o id {" + id + "}");
    }
}

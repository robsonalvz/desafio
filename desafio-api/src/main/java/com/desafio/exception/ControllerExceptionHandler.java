package com.desafio.exception;

import com.desafio.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Response<Void>> entityNotFoundException(EntityNotFoundException e){
        Response<Void> response = new Response<>();
        response.getErrors().add(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND.value()).body(response);
    }

    @ExceptionHandler(PersonExistsException.class)
    public ResponseEntity<Response<Void>> personExistsException(PersonExistsException e){
        Response<Void> response = new Response<>();
        response.getErrors().add(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND.value()).body(response);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Response<Void>> badCredentialsException(BadCredentialsException e){
        Response<Void> response = new Response<>();
        response.getErrors().add("Usuário ou senha inválido");
        return ResponseEntity.status(HttpStatus.FORBIDDEN.value()).body(response);
    }

}

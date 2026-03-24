package com.vgu.tripify.exception;
import com.sun.net.httpserver.HttpsServer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

// tell Spring Boot to treat it as a global exception interceptor -> This help reduce try and catch in every controller
@RestControllerAdvice
public class GlobalExceptionHandler {
//    @ExceptionHandler(TripNotFoundException.class) // 404
//
//
//    @ExceptionHandler(AccessDeiniedException.class) // 403
//
//
//    @ExceptionHandler(InsufficientCreditsException.class) // 402
//
//
//    @ExceptionHandler(AiProviderException.class) // 503 graceful AI failure
//
//
//    @ExceptionHandler(StripWebHookException.class) // 400
//
//
    // This @ExceptionHandler -> Catch every error relating to MethodArgument error
    //(Typically @Valid error, Spring will throw this type of error)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors (MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach((fieldError) ->
                errors.put(fieldError.getField(), fieldError.getDefaultMessage())
        );
        // BindingResult is an 'object' that hold the complete result of the validation process
        // Field error is the one field, which has been violated( e.g username or email)
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
}

package com.vgu.tripify.service.impl;

import com.vgu.tripify.domain.dto.request.RegisterRequest;
import com.vgu.tripify.domain.dto.request.UpdateUserRequest;
import com.vgu.tripify.domain.dto.response.UserResponse;
import com.vgu.tripify.domain.entity.User;
import com.vgu.tripify.domain.enums.Role;
import com.vgu.tripify.exception.EmailAlreadyExistsException;
import com.vgu.tripify.repository.UserRepository;
import com.vgu.tripify.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder; later needed to encode the password

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse register(RegisterRequest request) {
        // 1. check if email exists
        if(userRepository.existsByEmail(request.getEmail())){
            throw new EmailAlreadyExistsException("email","This Email is already registered");
        }
        // 2. Create new database entity
        User newUser = new User();
        newUser.setEmail(request.getEmail());

        newUser.setPasswordHash(request.getPassword());
        newUser.setRole(Role.FREE);
        newUser.setCredits(5);

        // 3. save to database
        User saveUser = userRepository.save(newUser);

        // 4. Convert to safe Response DTO
        UserResponse userResponse = new UserResponse();
        userResponse.setRole(saveUser.getRole().name());
        userResponse.setEmail(saveUser.getEmail());
        userResponse.setRemainingCredits(saveUser.getCredits());
        // 5. return to controller
        return userResponse;
    }

    @Override
    public UserResponse getUserById(Long id) {
//        Example of handling DTO

        // 1. Get from DB
//        User userEntity = userRepository.findById(userId).orElseThrow();
//
//        // 2. Put into safe DTO
//        UserResponse response = new UserResponse();
//        response.setEmail(userEntity.getEmail());
//        response.setRemainingCredits(userEntity.getCredits());
//        response.setRole(userEntity.getRole().name());
//
//        // 3. Return DTO to Controller
//        return response;

        return null;
    }

    @Override
    public void updatePersonalDetail(Long id, UpdateUserRequest request) {

    }
}

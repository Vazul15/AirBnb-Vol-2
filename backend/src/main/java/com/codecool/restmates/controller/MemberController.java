package com.codecool.restmates.controller;

import com.codecool.restmates.exception.EmailAlreadyExistsException;
import com.codecool.restmates.exception.InvalidEmailPattern;
import com.codecool.restmates.exception.InvalidPasswordPattern;
import com.codecool.restmates.exception.UnauthorizedException;
import com.codecool.restmates.model.dto.requests.member.NewMemberDTO;
import com.codecool.restmates.model.dto.responses.MemberResponseDTO;
import com.codecool.restmates.model.entity.Member;
import com.codecool.restmates.model.entity.Role;
import com.codecool.restmates.model.entity.RoleType;
import com.codecool.restmates.model.payload.JwtResponse;
import com.codecool.restmates.model.payload.LoginRequest;
import com.codecool.restmates.model.payload.RegisterRequest;
import com.codecool.restmates.repository.RoleRepository;
import com.codecool.restmates.security.jwt.JwtUtils;
import com.codecool.restmates.service.MemberService;
import com.codecool.restmates.util.EmailValidator;
import com.codecool.restmates.util.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@RestController
@RequestMapping(path = "/api/member")
public class MemberController {
    private final MemberService memberService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;


    @Autowired
    public MemberController(
            MemberService memberService,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtils jwtUtils) {
        this.memberService = memberService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/all")
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }

    @GetMapping(path = "")
    public MemberResponseDTO getMemberProfile(Authentication authentication) {
        String userEmail = authentication.getName();
        return memberService.getMemberByEmail(userEmail);
    }

    @PutMapping(path = "")
    public Long updateMember(Authentication authentication, @RequestBody NewMemberDTO member) {
        String userEmail = authentication.getName();
        return memberService.updateMember(userEmail, member);
    }

    @DeleteMapping(path = "")
    public boolean deleteMember(Authentication authentication) {
        String userEmail = authentication.getName();
        return memberService.deleteMember(userEmail);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> createUser(@RequestBody RegisterRequest registerRequest) {
        if (memberService.existsEmail(registerRequest.getEmail())) {
            throw new EmailAlreadyExistsException("E-mail already exists: " + registerRequest.getEmail());
        }

        if (!EmailValidator.isValidEmail(registerRequest.getEmail())) {
            throw new InvalidEmailPattern("Invalid e-mail pattern: " + registerRequest.getEmail());
        }

        if (!PasswordValidator.isValidPassword(registerRequest.getPassword())) {
            throw new InvalidPasswordPattern(
                    "Invalid password pattern. The password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (e.g., !, @, #, $, %, ^, &, +, =)."
            );
        }

        Member member = new Member(
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                registerRequest.getPhoneNumber(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword())
        );

        Optional<Role> defaultRoleType = roleRepository.findByRoleType(RoleType.ROLE_USER);

        if (defaultRoleType.isPresent()) {
            member.setRoles(Set.of(defaultRoleType.get()));
        } else {
            Role defaultRole = new Role(RoleType.ROLE_USER);
            roleRepository.save(defaultRole);
            member.setRoles(Set.of(defaultRole));
        }

        memberService.saveMember(new NewMemberDTO(member.getFirstName(), member.getLastName(), member.getEmail(), member.getPassword(), member.getPhoneNumber()));

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtils.generateJwtToken(authentication);

            User userDetails = (User) authentication.getPrincipal();

            List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

            return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), roles));
        } catch (BadCredentialsException exception) {
            throw new UnauthorizedException("Invalid e-mail or password.");
        }
    }

}

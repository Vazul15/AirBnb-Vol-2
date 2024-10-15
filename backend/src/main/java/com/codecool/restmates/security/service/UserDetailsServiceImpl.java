package com.codecool.restmates.security.service;

import com.codecool.restmates.exception.EmailNotFoundException;
import com.codecool.restmates.model.entity.Member;
import com.codecool.restmates.model.entity.Role;
import com.codecool.restmates.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Autowired
    public UserDetailsServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member memberEntity = memberRepository.findByEmail(email)
                .orElseThrow(() -> new EmailNotFoundException(email));

        List<SimpleGrantedAuthority> roles = new ArrayList<>();
        for (Role role : memberEntity.getRoles()) {
            roles.add(new SimpleGrantedAuthority(role.getRoleType().toString()));
        }

        return new User(memberEntity.getEmail(), memberEntity.getPassword(), roles);
    }
}

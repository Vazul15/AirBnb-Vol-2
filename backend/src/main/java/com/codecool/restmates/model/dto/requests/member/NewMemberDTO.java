package com.codecool.restmates.model.dto.requests.member;

public record NewMemberDTO(String firstName, String lastName, String email, String password, String phoneNumber) {
}

package com.codecool.restmates.service;

import com.codecool.restmates.model.dto.requests.member.IDMemberDTOResponse;
import com.codecool.restmates.model.dto.requests.member.NewMemberDTO;
import com.codecool.restmates.model.dto.responses.FullAccommodationDTO;
import com.codecool.restmates.model.dto.responses.LocationCityStateCountryDTO;
import com.codecool.restmates.model.dto.responses.MemberResponseDTO;
import com.codecool.restmates.exception.EmailAlreadyExistsException;
import com.codecool.restmates.exception.ResourceNotFoundException;
import com.codecool.restmates.model.dto.responses.ReservationDTO;
import com.codecool.restmates.model.entity.Member;
import com.codecool.restmates.model.entity.Role;
import com.codecool.restmates.model.entity.RoleType;
import com.codecool.restmates.repository.MemberRepository;
import com.codecool.restmates.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository, RoleRepository roleRepository) {
        this.memberRepository = memberRepository;
        this.roleRepository = roleRepository;
    }

    public MemberResponseDTO getMemberByEmail(String memberEmail) {
        Optional<Member> member = memberRepository.findByEmail(memberEmail);

        if(member.isPresent()) {
            Member foundMember = member.get();
            List<ReservationDTO> reservations =  foundMember.getReservations().stream()
                    .map(reservation -> new ReservationDTO(reservation.getStartDate(), reservation.getEndDate(), reservation.getAccommodation().getName(), reservation.getValue())).toList();

            List<FullAccommodationDTO> memberAccommodations =  foundMember.getAccommodations()
                    .stream()
                    .map(accommodation -> new FullAccommodationDTO(accommodation.getId(),
                            accommodation.getName(),
                            accommodation.getDescription(),
                            accommodation.getRoomNumber(),
                            accommodation.getPricePerNight(),
                            accommodation.getMaxGuests(),
                            new LocationCityStateCountryDTO(accommodation.getLocation().getCity(),accommodation.getLocation().getState() ,accommodation.getLocation().getCountry())))
                    .toList();


            return new MemberResponseDTO(foundMember.getFirstName(),
                    foundMember.getLastName(), foundMember.getEmail(), foundMember.getPhoneNumber(), memberAccommodations, reservations);
        } else {
            throw new ResourceNotFoundException(String.format("Member with id %s not found", memberEmail));
        }
    }

    public Long saveMember(NewMemberDTO memberDTO) {
        if (memberRepository.existsByEmail(memberDTO.email())) {
            throw new EmailAlreadyExistsException(String.format(" %s already exists.", memberDTO.email()));
        }
        Member memberEntity = new Member(memberDTO.firstName(),memberDTO.lastName(), memberDTO.phoneNumber(), memberDTO.email(), memberDTO.password());

        Optional<Role> defaultRoleType = roleRepository.findByRoleType(RoleType.ROLE_USER);

        if (defaultRoleType.isPresent()) {
            memberEntity.setRoles(Set.of(defaultRoleType.get()));
        } else {
            Role defaultRole = new Role(RoleType.ROLE_USER);
            roleRepository.save(defaultRole);
            memberEntity.setRoles(Set.of(defaultRole));
        }

        memberRepository.save(memberEntity);
        return memberEntity.getId();
    }

    public Long updateMember(String memberEmail, NewMemberDTO updatedMember) {
        Member member = memberRepository.findByEmail(memberEmail)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("%s does not exist.", memberEmail)));

        member.setFirstName(updatedMember.firstName());
        member.setLastName(updatedMember.lastName());
        if (existsEmail(member.getEmail())) {
            member.setEmail(updatedMember.email());
        }
         memberRepository.save(member);
        return member.getId();
    }
    @Transactional
    public Boolean deleteMember(String memberEmail) {
        if (memberRepository.existsByEmail(memberEmail)) {
            memberRepository.deleteByEmail(memberEmail);
            return true;
        }
        throw new ResourceNotFoundException(String.format(" %s does not exist.", memberEmail));
    }

    public Boolean existsEmail(String email) {
        return memberRepository.existsByEmail(email);
    };

    public IDMemberDTOResponse authenticateLogin(String email, String password) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member != null && member.get().getPassword().equals(password)) {
            return new IDMemberDTOResponse(member.get().getId());
        } else {
            throw new ResourceNotFoundException("Email or password is incorrect.");
        }
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
}

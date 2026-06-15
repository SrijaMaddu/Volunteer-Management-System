package com.example.demo.controller;

import com.example.demo.model.Volunteer;
import com.example.demo.repository.VolunteerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
@CrossOrigin("*")
public class VolunteerController {

    private final VolunteerRepository repository;

    public VolunteerController(
            VolunteerRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Volunteer saveVolunteer(
            @RequestBody Volunteer volunteer) {

        return repository.save(volunteer);
    }

    @GetMapping
    public List<Volunteer> getAllVolunteers() {
        return repository.findAll();
    }
    @PutMapping("/{id}")
    public Volunteer updateVolunteer(
            @PathVariable Long id,
            @RequestBody Volunteer updatedVolunteer) {

        Volunteer volunteer = repository.findById(id)
                .orElseThrow();

        volunteer.setName(updatedVolunteer.getName());
        volunteer.setEmail(updatedVolunteer.getEmail());
        volunteer.setPhone(updatedVolunteer.getPhone());

        return repository.save(volunteer);
    }
    @DeleteMapping("/{id}")
    public String deleteVolunteer(@PathVariable Long id) {

        repository.deleteById(id);

        return "Volunteer Deleted Successfully";
    }
}
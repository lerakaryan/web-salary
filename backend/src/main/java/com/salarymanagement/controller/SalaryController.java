package com.salarymanagement.controller;

import com.salarymanagement.model.Salary;
import com.salarymanagement.repository.SalaryRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/salaries")
public class SalaryController {

    private final SalaryRepository salaryRepository;

    public SalaryController(SalaryRepository salaryRepository) {
        this.salaryRepository = salaryRepository;
    }

    @GetMapping
    public ResponseEntity<Page<Salary>> getAllSalaries(Pageable pageable) {
        return ResponseEntity.ok(salaryRepository.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Salary> getSalaryById(@PathVariable Long id) {
        return ResponseEntity.ok(salaryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Salary not found with id: " + id)));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<Page<Salary>> getSalariesByEmployeeId(
            @PathVariable Long employeeId,
            Pageable pageable) {
        return ResponseEntity.ok(salaryRepository.findByEmployeeId(employeeId, pageable));
    }

    @GetMapping("/by-date")
    public ResponseEntity<Page<Salary>> getSalariesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            Pageable pageable) {
        return ResponseEntity.ok(salaryRepository.findByPaymentDateBetween(startDate, endDate, pageable));
    }

    @PostMapping
    public ResponseEntity<Salary> createSalary(@Valid @RequestBody Salary salary) {
        return ResponseEntity.ok(salaryRepository.save(salary));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Salary> updateSalary(
            @PathVariable Long id,
            @Valid @RequestBody Salary salary) {
        if (!salaryRepository.existsById(id)) {
            throw new RuntimeException("Salary not found with id: " + id);
        }
        salary.setId(id);
        return ResponseEntity.ok(salaryRepository.save(salary));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalary(@PathVariable Long id) {
        if (!salaryRepository.existsById(id)) {
            throw new RuntimeException("Salary not found with id: " + id);
        }
        salaryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

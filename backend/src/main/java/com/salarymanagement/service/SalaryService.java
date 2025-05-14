package com.salarymanagement.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.salarymanagement.dto.SalaryDto;
import com.salarymanagement.mapper.SalaryMapper;
import com.salarymanagement.model.Salary;
import com.salarymanagement.repository.SalaryRepository;

@Service
public class SalaryService {

    private final SalaryRepository salaryRepository;
    private final SalaryMapper salaryMapper = SalaryMapper.INSTANCE;

    public SalaryService(SalaryRepository salaryRepository) {
        this.salaryRepository = salaryRepository;
    }

    public SalaryDto createSalary(SalaryDto salaryDto) {
        Salary salary = salaryMapper.salaryDtoToSalary(salaryDto);
        Salary savedSalary = salaryRepository.save(salary);
        return salaryMapper.salaryToSalaryDto(savedSalary);
    }

    public Optional<SalaryDto> getSalaryById(Long id) {
        return salaryRepository.findById(id)
                .map(salaryMapper::salaryToSalaryDto);
    }

    public Page<SalaryDto> getAllSalaries(Pageable pageable) {
        return salaryRepository.findAll(pageable)
                .map(salaryMapper::salaryToSalaryDto);
    }

    public Page<SalaryDto> getSalariesByEmployeeId(Long employeeId, Pageable pageable) {
        return salaryRepository.findByEmployeeId(employeeId, pageable)
                .map(salaryMapper::salaryToSalaryDto);
    }
    
    public Double getTotalPaidAmountByEmployeeId(Long employeeId) {
        return salaryRepository.getTotalPaidAmountByEmployeeId(employeeId);
    }
}
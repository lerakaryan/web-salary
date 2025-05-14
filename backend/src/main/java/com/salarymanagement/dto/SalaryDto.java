package com.salarymanagement.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SalaryDto {
    private Long id;
    private EmployeeDto employee;
    private Double amount;
    
    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate paymentDate;
}
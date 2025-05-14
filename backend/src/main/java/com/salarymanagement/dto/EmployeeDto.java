package com.salarymanagement.dto;

import lombok.Data;

@Data
public class EmployeeDto {
    private Long id;
    private String fullName;
    private String email;
    private String position;
    private String department;
}

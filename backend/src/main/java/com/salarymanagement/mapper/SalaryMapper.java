package com.salarymanagement.mapper;

import com.salarymanagement.dto.SalaryDto;
import com.salarymanagement.model.Salary;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SalaryMapper {
    SalaryMapper INSTANCE = Mappers.getMapper(SalaryMapper.class);
    
    SalaryDto salaryToSalaryDto(Salary salary);
    Salary salaryDtoToSalary(SalaryDto salaryDto);
}
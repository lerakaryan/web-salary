package com.salarymanagement.repository;

import com.salarymanagement.model.Salary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {
    Page<Salary> findByEmployeeId(Long employeeId, Pageable pageable);
    
    Page<Salary> findByPaymentDate(LocalDate paymentDate, Pageable pageable);
    
    Page<Salary> findByPaymentDateBetween(LocalDate startDate, LocalDate endDate, Pageable pageable);
    
    @Query("SELECT s FROM Salary s WHERE s.employeeId = :employeeId AND s.paymentDate BETWEEN :startDate AND :endDate")
    Page<Salary> findByEmployeeIdAndPaymentDateBetween(
        @Param("employeeId") Long employeeId, 
        @Param("startDate") LocalDate startDate, 
        @Param("endDate") LocalDate endDate,
        Pageable pageable
    );
    
    @Query("SELECT COALESCE(SUM(s.amount), 0) FROM Salary s WHERE s.employeeId = :employeeId")
    Double getTotalPaidAmountByEmployeeId(@Param("employeeId") Long employeeId);
    
    @Query("SELECT s FROM Salary s WHERE s.employeeId = :employeeId ORDER BY s.paymentDate DESC LIMIT 1")
    Optional<Salary> findTopByEmployeeIdOrderByPaymentDateDesc(@Param("employeeId") Long employeeId);
}

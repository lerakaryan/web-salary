package com.salarymanagement.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

// КОммент 1 git add . git commit -m "Пробую гит" git push

@Data
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, name = "full_name")
    private String fullName;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String position;
    
    @Column(nullable = false)
    private String department;
    
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Salary> salaries;
}

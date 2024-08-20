package com.emran.FirstClassBoot.entity;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false,length = 40,name = "studentName")
    private String name;

    @Column(nullable = false,unique = true)
    private String email;

    private  String cell;
    private String gender;

    private Date dob;

}

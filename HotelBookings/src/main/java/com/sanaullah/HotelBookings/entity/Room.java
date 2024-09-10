package com.sanaullah.HotelBookings.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id;
    private  String roomType;
    private String image;
    private  float price;
    private  int area;
    private  int adultNo;
    private  int childNo;
    private boolean avilability;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hotelId")
    private  Hotel hotel;


}

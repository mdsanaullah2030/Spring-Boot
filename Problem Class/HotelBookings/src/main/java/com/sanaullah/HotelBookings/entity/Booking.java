package com.sanaullah.HotelBookings.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date checkindate;
    private Date checkoutdate;
    private float totalprice;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hotelId")
    private Hotel hotel;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roomId")
    private Room room;




}
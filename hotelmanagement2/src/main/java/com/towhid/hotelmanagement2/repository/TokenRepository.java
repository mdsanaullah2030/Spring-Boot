package com.towhid.hotelmanagement2.repository;

import com.towhid.hotelmanagement2.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository  extends JpaRepository<Token,Integer> {
}

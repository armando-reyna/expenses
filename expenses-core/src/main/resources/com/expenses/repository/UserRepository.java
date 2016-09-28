package com.expenses.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expenses.entity.User;

/**
 * Created by armando-reyna on 06/06/15.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUserAndPassword(String user, String password);

	User findByUser(String user);

}

package com.expenses.service;

import com.expenses.entity.User;
import com.expenses.entity.request.LoginDTO;

import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

/**
 * Created by armando-reyna on 06/06/15.
 */
@Service
public interface UserService extends Serializable {
	User findByUserAndPassword(LoginDTO user);

	User save(User user);

	List<User> findAllUsers();

	User findById(int id);

	User findByUser(String user);

}

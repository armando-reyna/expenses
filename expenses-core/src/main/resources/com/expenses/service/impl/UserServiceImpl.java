package com.expenses.service.impl;

import com.expenses.entity.User;
import com.expenses.entity.request.LoginDTO;
import com.expenses.repository.UserRepository;
import com.expenses.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserServiceImpl implements UserService {

	protected final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserRepository userRepository;

	public List<User> findAllUsers() {
		return userRepository.findAll();
	}

	public User findByUserAndPassword(LoginDTO user) {
		return userRepository.findByUserAndPassword(user.getUser(), user.getPassword());
	}

	public User save(User user) {
		User savedUser = userRepository.save(user);
		return savedUser;
	}


	public UserRepository getUserRepository() {
		return userRepository;
	}

	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User findById(int id) {
		return userRepository.findOne(id);
	}

	public User findByUser(String user) {
		return userRepository.findByUser(user);
	}

}

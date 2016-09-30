-- -----------------------------------------------------
-- Database: expenses
-- -----------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

drop database if exists expenses;
create schema expenses;
use expenses;

-- -----------------------------------------------------
-- Table `gastos`.`tab_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tab_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NULL,
  `name` VARCHAR(100) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gastos`.`cat_tipo_gasto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cat_type_expense` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gastos`.`tab_gasto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tab_expense` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_type_expense` INT NOT NULL,
  `name` VARCHAR(100) NULL,
  `date` DATE NULL,
  `cost` DOUBLE NULL,
  PRIMARY KEY (`id`, `id_user`, `id_type_expense`),
  INDEX `fk_tab_gasto_tab_usuario_idx` (`id_user` ASC),
  INDEX `fk_tab_gasto_cat_tipo_gasto1_idx` (`id_type_expense` ASC),
  CONSTRAINT `fk_tab_gasto_tab_usuario`
    FOREIGN KEY (`id_user`)
    REFERENCES `tab_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tab_gasto_cat_tipo_gasto1`
    FOREIGN KEY (`id_type_expense`)
    REFERENCES `cat_type_expense` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

insert into tab_user(user,name,password) values("armando","Armando Reyna","admin");
insert into tab_user(user,name,password) values("dave","David Cisneros","admindave");
insert into cat_type_expense(name) values("Oficina");
insert into cat_type_expense(name) values("Personal");
insert into cat_type_expense(name) values("Servicio");
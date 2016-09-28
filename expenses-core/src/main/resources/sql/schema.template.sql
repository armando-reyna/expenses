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
CREATE TABLE IF NOT EXISTS `cat_tipo_gasto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gastos`.`tab_gasto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tab_gasto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_tipo_gasto` INT NOT NULL,
  `nombre` VARCHAR(100) NULL,
  `fecha` DATE NULL,
  `monto` DOUBLE NULL,
  PRIMARY KEY (`id`, `id_usuario`, `id_tipo_gasto`),
  INDEX `fk_tab_gasto_tab_usuario_idx` (`id_usuario` ASC),
  INDEX `fk_tab_gasto_cat_tipo_gasto1_idx` (`id_tipo_gasto` ASC),
  CONSTRAINT `fk_tab_gasto_tab_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `gastos`.`tab_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tab_gasto_cat_tipo_gasto1`
    FOREIGN KEY (`id_tipo_gasto`)
    REFERENCES `gastos`.`cat_tipo_gasto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

insert into tab_user(user,name,password) values("armando","Armando Reyna","admin");
insert into tab_user(user,name,password) values("dave","David Cisneros","admindave");
insert into cat_tipo_gasto(nombre) values("Oficina");
insert into cat_tipo_gasto(nombre) values("Personal");
insert into cat_tipo_gasto(nombre) values("Servicio");
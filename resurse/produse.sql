-- Database: db_prod

-- DROP DATABASE db_prod;

CREATE DATABASE db_prod
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'ro-RO-x-icu'
    LC_CTYPE = 'ro_RO'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
	CREATE USER alexpraf WITH ENCRYPTED PASSWORD 'prafalex';
	GRANT ALL PRIVILEGES ON DATABASE db_prod TO alexpraf;
	GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public to alexpraf;
CREATE TYPE categ_produs AS ENUM('ingrijire','merch','accesorii','editie limitata','normal');

CREATE TYPE mod_expediere AS ENUM('curier','posta','ridicare personala');
CREATE TABLE IF NOT EXISTS produse(
    id serial PRIMARY KEY,
    nume VARCHAR(30) NOT NULL,
    descriere TEXT,
    imagine VARCHAR(300),
    categorie categ_produs DEFAULT 'normal',
	mod_exp mod_expediere DEFAULT 'ridicare personala',
    pret NUMERIC(8,2) NOT NULL,
    garantie NUMERIC(4,2),
    data_adaugare TIMESTAMP default current_timestamp,
	culoare varchar(20),
    compatibil VARCHAR[],
    voucher BOOlEAN
);



insert into produse (id,nume,descriere,imagine,categorie,pret,garantie,compatibil,voucher,mod_exp,culoare) VALUES
('1','Stergator','Stergator Aero','stergator.jpg','normal',45.50,3,'{"BMW","AUDI"}',True,'curier','Negru'),
('2','Solutie Jante','Solutie profesionala de curatat jantele','sol_jante.jpg','ingrijire',22.2,4,'{"MULTIMARCA"}',False,'curier','Negru'),
('3','Tricou AXP','Tricou de cea mai buna calitate', 'tricou.jpg','merch',80,0,'{"Unisex"}',True,'curier','Negru'),
('4','Sapca AXP','Sapca Snapback','sapca.jpg','merch',50,0,'{"Unisex"}',True,'ridicare personala','alb'),
('5','Windbreaker','Geaca pentru toamna','windbreaker.jpg','merch',100,0,'{"Unisex"}',True,'ridicare personala','negru'),
('6','Solutie Parbriz','Solutie profesionala de curatat parbrizul contra insecte','sol_parbriz.jpg','ingrijire',15.4,0,'{"MULTIMARCA"}',False,'curier','albastru'),
('7','Breloc cheie','Breloc pentru chei cu tema auto','breloc.jpg','accesorii',11.5,0,'{"MULTIPLA"}',False,'posta','Mai multe culori'),
('8','Antena radio','Antena radio aerodinamica','antena.png','accesorii',60.4,5,'{"MULTIMARCA"}',False,'curier','negru'),
('9','Tablou auto','Tablou cu evenimente din domeniu','tablou.jpg','editie limitata',80.4,0,'{"MULTIPLA"}',True,'ridicare personala','Mai multe culori'),
('10','Stickere','Un pachet de 10 stickere cu tema auto','stickere.jpg','editie limitata',15.0,0,'{"MULTIPLA"}',False,'ridicare personala','Mai multe culori'),
('11','Aditiv motor','Aditiv motor pentru curatare','aditiv.png','ingrijire',33.4,4,'{"MULTIMARCA"}',False,'curier','Negru'),
('12','Becuri led','Becuri led pentru interior','becuri.png','normal',45.3,4,'{"Ford","VW"}',True,'posta','alb'),
('13','Tavita portbagaj','Tavita pentru portbagaj pentru mai buna organizare','tavita.jpg','accesorii',70.3,5,'{"Mercedes","Seat"}',False,'curier','negru'),
('14','Solutie cauciucuri','Solutie pentru cauciuri pentru o mai buna stralucire','sol_cauciucuri.jpg','ingrijire',17.2,0,'{"MULTIMARCA"}',False,'curier','albastru'),
('15','Bec H7','Bec H7 150% pentru o mai buna vizibilitate noaptea','bec.png','normal',120.4,10,'{"MULTIMARCA"}',True,'curier','albastru');




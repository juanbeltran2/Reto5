package co.usa.ciclo3.solReto3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan(basePackages = {"co.usa.ciclo3.solReto3.model"})
@SpringBootApplication
public class SolReto3Application {

	public static void main(String[] args) {
		SpringApplication.run(SolReto3Application.class, args);
	}

}
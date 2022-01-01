/*
CS 1530
Group 5
Justin Harnishfeger
Ethan Vukelich
Matthew DiPaolo
Radik Fakhretdinov
Jacob Kefalos
*/

package locals;

import graphql.language.SelectionSet;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;


public class SignInTesting {

    public static void main(String[] args) throws InterruptedException {

    System.setProperty("webdriver.chrome.driver","/Users/radikfakhretdinov/Downloads/chromedriver");
        WebDriver driver = new ChromeDriver();
        //WebDriver driver = new ChromeDriver();

        //Test if this website is launching properly.
        driver.get("http://localhost:3000");


        WebElement usernameField = driver.findElement(By.cssSelector("input[type='username']"));
        WebElement passwordField = driver.findElement(By.cssSelector("input[type='password']"));
        WebElement submitButton = driver.findElement(By.cssSelector("button[type='submit']"));

        //
        usernameField.sendKeys("PAROL");
        passwordField.sendKeys("1234");
        submitButton.click();

        String errorMessage = "Sorry, incorrect password. Please try again.";

        //Pauses test execution for specified time in milliseconds
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //If username and password are incorrect, it has to show the error Message
        if(driver.getPageSource().contains(errorMessage))
        {
            System.out.println("This test passed Successfully");
        }
        else
        {
            System.out.println("Failed");
        }

        //navigate to another web page
        driver.navigate().to("https://www.pitt.edu");

        //Pause execution for a given time
        Thread.sleep(3000);

        //navigate back to Locals
        driver.navigate().back();

        //Pause an execution for 4 seconds
        Thread.sleep(4000);

        //Maximizing the current web page
        driver.manage().window().maximize();


        //Pause an execution for 3 seconds
        Thread.sleep(3000);


        driver.close();
        driver.quit();


    }

}

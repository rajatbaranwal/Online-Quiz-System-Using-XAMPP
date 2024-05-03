<?php
// Check if the form has been submitted

    // Retrieve form data
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $section = $_POST['section'];
    $email = $_POST['email'];
    $studentID = $_POST['studentID'];
    
    echo $username;
    
    $servername = "localhost";
    $username_db = "root"; 
    $password_db = ""; 
    $dbname = "WEB PROJECT";


  
    $conn = mysqli_connect($servername, $username_db, $password_db, $dbname);
 
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
   
    // SQL query to insert data into a table
    $sql = "INSERT INTO users VALUES ('$username', '$section', '$email', '$studentID')";

    if ($result = mysqli_query($conn, $sql)) {
        echo "New record created successfully";
       
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    // Close connection
    mysqli_close($conn);
}

?>

<?php
$servername = "localhost";
$username = "bookfoxi_cmp";
$password = "campus@2017";
$dbname = "bookfoxi_campusbox";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM contents";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $rows = $result->fetch_assoc() {
    
    // while($row = $result->fetch_assoc()) {
?>


           <meta property="og:title" content="<?php echo $row["title"]; ?>" />
            <meta property="og:description" content="<?php echo $row["title"]; ?>" />



<?php



        echo "id: " . $row["content_id"]. " - Name: " . $row["title"]. "<br>";
break();
    }
} else {
    echo "0 results";
}
$conn->close();
?>
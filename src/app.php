<?php 
require('config.php');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM contents where content_id=21  limit 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
	while($row = $result->fetch_assoc()) {
		?>
		<title><?php echo $row['title']; ?></title>
		<meta property="og:title" content="<?php echo $row["title"]; ?>" />
		<meta property="og:description" content="<?php echo $row["title"]; ?>" />

		<?php

		echo "id: " . $row["content_id"]. " - Name: " . $row["title"]. "<br>";
        echo "SERVER['REQUEST_URI'] " . $_SERVER['REQUEST_URI']. "<br> - SERVER['QUERY_STRING']
        : " . $_SERVER['QUERY_STRING']
        . "<br>";
    }
} else {
	echo "0 results";
}
$conn->close();
?>
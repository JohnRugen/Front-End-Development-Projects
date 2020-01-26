<?php
// For loop example
// Producing elements of an indexed array within a html page


// Indexed array 
$characters=['Arthur Dent', 'Ford Prefect', 'Zaphod Beeblox', 'Marvin', 'Slartibartfast'];
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Hitchiker Characters</title>
</head>
<body>

<h1>Main Characters</h1>

<ul>
    <?php
    $num_items = count($characters); // grabbing the total amount of elements within the array and assigning to a variable
    for($i = 0; $i < $num_items; $i++) // similar to javascript
    {
        echo "<li>$characters[$i]</li>";
    }
    ?>
</ul>
    
</body>
</html>
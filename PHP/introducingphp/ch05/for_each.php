<?php
// Foreach example

// Indexed array 
$characters=['Arthur Dent', 'Ford Prefect', 'Zaphod Beeblox', 'Marvin', 'Slartibartfast'];

// Associative array
$descriptions=[
    'Earth'=>'mostly harmless',
    'Marvin'=>'the paranoid android',
    'Zaphod Beeblebrox'=>'President of the Imperial Galactic Government'
];

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Foreach</title>
</head>
<body>
    <h1> Main Characters </h1>

    <ul>
    <?php
    foreach($characters as $name) // grabbing each element within the array and assinging to variable
    {
        echo "<li>$name</li>"; // echo that variable
    }
    ?>
    </ul>

    <br>
    <h1> Descriptions </h1>


    <!-- Foreach - Associative Array !-->
    <ul>
    <?php
    foreach($descriptions as $key => $value) // Again, assiging key and value to variables that can be recalled, can be renamed.
    {
        echo"<p>$key is $value";
    }
    ?>
    </ul>
</body>
</html>
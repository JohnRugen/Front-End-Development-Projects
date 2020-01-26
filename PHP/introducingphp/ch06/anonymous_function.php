<?php
// Looking at anonymous functions

// A multi-dimensional array. It's an indexed array with each index containing a small associative array
$friends = [
    ['first'=>'Jim', 'last'=>'White'],
    ['first'=>'Jane', 'last'=>'White'],
    ['first'=>'Hilary', 'last'=>'Brown'],
    ['first'=>'Harry', 'last'=>'Brown'],
    ['first'=>'Paul', 'last'=>'Green'],
    ['first'=>'Amanda', 'last'=>'Green'],
    ['first'=>'John', 'last'=>'Black'],
    ['first'=>'Diana', 'last'=>'Black']
];

// An anonymous function
usort($friends, function($a, $b){
    return [$a['last'], $a['first']] <=> [$b['last'], $b['first']]; 
    // spaceship (built in), compares two elements of an array and returns either -1, 0 or 1 depending on how they compare
    // So here it's comparing by last and first name. It ONLY works in php 7
});
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>anonymous functions</title>
</head>
<body>
<h1> User-Defined Sort </h1>

<?php
foreach($friends as $friend)
{
    echo '<li>' . implode(' ', $friend) . '</li>'; // Implode converts to string, first argument (' ') is what to put in between each element 
}

?>
</body>
</html>
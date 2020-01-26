<?php
// Exploring the ternary operator (?:)

$answer = 42;

$number = 0; // If this is removed, $number is essentially null as it hasn't been declared.


// If variable matches comparison (does answer = 42) assign result to the first string, if not assign to the second string. Essentaily a if/else statement but easier to read.
$result = ($answer == 42)? 'The answer to the Ultimate Question of Life, the Universe and Everything' : 'Keep calculating';


// This will either be the value of number or 25. ?? is a null coalesce operator. If the first condition is null ($number) it'll assign the second condition. If it's not null
// Then the first condition will be used.
// Multiple instances of ?? can be used, to check multiple variables
$secondResult = $number ?? 25;

echo $result;
echo $secondResult; 

?>
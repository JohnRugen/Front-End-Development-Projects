<?php
// Looking at function types, passing by value doesn't alter the original varaible
// It makes a copy

$number = 2; // Original


// Pass by value function
function doubleIt($number)
{
    return $number *=2; // number = number * 2 (using a copy)
}

// Pass by reference WOULD change the original variable
/*
function doubleIt($number)
{
    $number *= 2;
}
*/

$doubled = doubleIt($number); // Doesn't actually change the number value, creates a copy and returns it

echo '$doubled is' . $doubled . '<br>'; 
echo '$number is' . $number . '<br>';



?>
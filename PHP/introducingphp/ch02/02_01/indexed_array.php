<?php

// Looking at indexed arrays | Two ways of declaring an array
//$characters = array('Arthur Dent', 'Ford Prefect', 'Zaphod Beeblebrox');
$characters = ['Arthur Dent', 'Ford Prefect', 'Zaphod Beeblebrox'];


// Adding elements to the array, php automatically adds to the next indexes
$characters [] = "Marvin";
$characters [] = "Slartibartfast";

// Cannot just echo an array, use print_r
//display the array
print_r($characters); 

// display a certian element
echo $characters[1];
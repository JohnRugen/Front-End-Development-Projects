<?php
// Associative array practice

// Declared as such, rather than index numbers, it uses keys (Earth, Marvin) followed by the actual data (descriptions in this case)
$descriptions = [
    'Earth' => 'mostly harmless', 
    'Marvin' => 'the paranoid android'
];

// Adding another key and element
$descriptions['Zaphod'] = 'President of the Imperial Galactic Government';

echo $descriptions['Marvin'];

print_r($descriptions);

// Displaying an element within a string

echo "Earth is describes as {$descriptions['Earth']}";

?>
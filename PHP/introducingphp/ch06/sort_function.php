<?php
// Looking at the built in sort function

$alpha_sorted=[
    'John',
    'Alex',
    'David',
    'Zeephos',
    'Carl',
    'Andy',
    'Roberto'
];

$r_sorted=[
    'Alex',
    'John',
    'Roberto',
    'Andrew',
    'Zeephos',
    'Carl'
];

// Sorts an array out alphabetically
sort($alpha_sorted);

// Sorts an array out alphabetically, but reveresed
rsort($r_sorted);


foreach($alpha_sorted as $name)
{
    echo $name;
}

echo "<br>";

foreach($r_sorted as $name)
{
    echo $name;
}

?>
<?php
// Date function - https://www.php.net/manual/en/function.date.php


// Storing a time stamp using string to time (converts a string to time...)
$xmas2019 = strtotime('Dec 25, 2019');

echo date('l d,  F, Y', $xmas2019); // Putting in the format for the time, and then passing in a variable that contains a time stamp



?>
<?php

// Can use either ' or " within php

$singleExample = 'This is John\'s example';
$doubleExample = "This is another of John\"s example";

// If part of the variable needs the same char you opened with, use \ to specify it's part of the var. \ won't show but following char will

echo $singleExample, ' ', " ", $doubleExample;

// Everything within single quotes ('') is treated as literal text. So it wont show variables, use double quotes for this ex:

echo "I love: $singleExample";

// Compared to:
echo 'I love: $singleExample';
?>
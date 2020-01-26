<?php
// While loop example
$i = 0;



// Within a while loop you can use 'continue' which goes back to the top of the loop, essentially not carrying out the echo below it.
// or 'break' can be used which ends the loop prematurely.
while($i < 10)
{
    // Increment
    $i++;
    if($i %2)
    {
        continue;
    }
    echo $i . '<br>';
}


?>
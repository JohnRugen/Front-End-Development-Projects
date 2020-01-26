<?php
// Exploring if statements

$name = 'Arthur Dent';
$day = 'Thursday';

// Php is case sensitive
// $name = 'Marvin' would be assigning the value, = assigns | == compares
if($name == 'Arthur Dent' && $day == 'Thursday')
{
    echo ' I could never get the hang of Thursdays.';
}
elseif($name == 'Marvin' || $day == 'Wednesday')
{
    echo "I've got this terrible pain in all the diodes down my left-hand side.";
}
else{
    echo ' Is that really a piece of fairy cake?';
}


// Or an if statement can be written as such: 
/*

if($value == 'value):
    do something;
elseif($othervalue == 'othervalue'):
    Do something different;
else:
    Do something even more different;
endif;

*/
?>
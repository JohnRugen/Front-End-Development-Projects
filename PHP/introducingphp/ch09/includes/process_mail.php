<?php

$suspect = false; // assuming nothing is suspect to begin with
$pattern = '/Content-type:|Bcc:|Cc:/i'; // looking for maliscious stuff? (regular expression)

function isSuspect($value, $pattern, &$suspect)
{
    // recursive function
    if(is_array($value))
    {
        foreach($value as $item)
        {
            isSuspect($item, $pattern, $suspect);
        }
    }
}


// For each in the associative post aray, essentially checking each value in the form sent via post
foreach($_POST as $key => $value)
{
    // strip whitespace from the values
    $value = is_array($value)? $value : trim($value); // is this an array? if not trim the value (trim gets rid of whitespace from strings)
    if(empty($value)&& in_array($key, $required)) // is this value empty and in the required array?
    {
        $missing[] = $key; // add this key to the missing array
        $$key = ''; // this makes it an empty string 
    }
    elseif(in_array($key, $expected)){
        $$key = $value; // it's in the array
    }
}

?>
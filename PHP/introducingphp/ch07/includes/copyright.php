<?php

function copyright($startYear)
{
    $currentyear = date('Y'); // Grabs the current year and saves as a year timestamp
    if($startYear < $currentyear) // if any years have passed
    {
        $currentyear = date('y');
        return "&copy; $startYear&ndash;$currentyear"; //return copyright y-y
    }
    else
    {
        return "&copy; $startYear"; // return copyright y
    }
}

?>
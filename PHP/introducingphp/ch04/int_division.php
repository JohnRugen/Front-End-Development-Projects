<?php


$total_minutes = 66;
$minutes = $total_minutes % 60;
$hours = ($total_minutes - $minutes) / 60;

echo "Time taken was $hours hours $minutes minutes";


?>
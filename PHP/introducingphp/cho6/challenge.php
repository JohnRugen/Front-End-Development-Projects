<?php
// Creating an automated copyright year display system on a web page

function displayYears($startYear)
{
    $currentYear = date('Y'); // Grab the current year
    if($currentYear > $startYear)
    {
        return $startYear . ' - ' . $currentYear;
    }
    else
    {
        return $currentYear;
    }
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chapter 6 Challenge</title>
</head>
<body>
<h1> The copyright challenge </h1>

<p>&copy <?php echo displayYears(2016); ?></p>
    
</body>
</html>
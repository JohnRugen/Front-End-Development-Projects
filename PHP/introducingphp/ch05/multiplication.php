<?php
// Generating a multiplication table (12x12)
$max = 25; // Scales
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Challenge: using loops</title>
    <link href="styles.css" rel="stylesheet" type="text/css">
</head>
<body>
<h1>Multiplication Table</h1>
<table>
<!-- First row, all th, then 1th 11 td !-->
<?php

// Initial Row
echo "<tr>";
for($i = 0; $i < $max+1; $i++)
{
    echo "<th> $i </th>";
}
echo "</tr>";

// Rest of the table
for($i = 1; $i < $max+1; $i++) // multlipier
{
    echo "<tr> <th> $i </th>";
    for($x = 1; $x < $max+1; $x++)
    {
        echo "<td> " . $x*$i . "</td>";
    }
    echo "</tr>";
}

?>
</table>
</body>
</html>
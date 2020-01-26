<?php

$siteroot = '/introducingphp/ch07'; // saving the site root, this variable can be used in external files so that links used there work.
// As they essentially move to the site root when they are included, so the file path to the link may not work
// can be used as shuch (href ="<?= $siteroot; />/filetolink.php)

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Using Server-Side Includes</title>
    <link href="styles.css" rel="stylesheet" type="text/css">
</head>
<body>
    <h1>Including External Files </h1>
    <p>This paragraph is in the original file</p>
    <?php include './includes/para.html'; // grabbing the html file ALWAYS use ./ to start in the current folder?>
    <p>This is also in the original File.</p>
    <?php include './includes/para.html';?>
    <?php require './includes/copyright.php'; // Require means the rest wont run unless it's been loaded?>
    <p><?php echo copyright(2020); // as it's been loaded in, the function in the external file can be used through this | Always has to be AFTER it's been loaded?> John Rugen </p>
</body>
</html>
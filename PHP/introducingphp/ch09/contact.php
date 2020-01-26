<?php
// Manipulating html form with php

// two arrays
$errors = [];
$missing = [];

if(isset($_POST['send'])) // if the form sends via POST
{
  $expected = ['name', 'email', 'comments']; // All the expected things to be filled out
  $required = ['name', 'comments']; // What is REQUIRED to be filled in
  require './includes/process_mail.php'; // including the file
}

?>

<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Get and post</title>
<link href="styles.css" rel="stylesheet" type="text/css">
</head>

<body>
<h1>Contact Us</h1>

<?php if($errors||$missing) : // if either array has something within them (an error or missing item has occured, then do)?>
  <p class = "warning">Please fix the item(s) indicated </p>
<?php endif;?>

<form method="post" action="<?= $_SERVER['PHP_SELF']; // This is a built in thing, it essentially targets this document. It's good as if the file 
// name changes, this wont need to be changed. ?>">
  <p>
    <label for="name">Name:</label>

    <?php if($missing && in_array('name', $missing)): // Checking if this specific item is missing by using in_array(item, array)?>
      <span class = "warning"> Please enter your name</span>
    <?php endif;?>

    <input type="text" name="name" id="name"
      <?php // This KEEPS any values in this field if there has been an error / missing data.
        if($errors || $missing){ // if there are errors or missing data
          echo 'value="' . htmlentities($name) . '"'; // store name in value
        }
        ?>
        >
  </p>
  <p>
    <label for="email">Email:</label>
    
    <?php if($missing && in_array('email', $missing)): ?>
      <span class="warning">Please enter your email</span>
    <?php endif; ?>

    <input type="email" name="email" id="email"
    <?php 
    if($errors || $missing){
      echo 'value="' . htmlentities($email) . '"';
    }
    ?>
    >

  </p>
  <p>
    <label for="comments">Comments:</label>

    <?php if($missing && in_array('comments', $missing)):?>
      <span class="warning">Please enter a comment </span>
    <?php endif; ?>
    
    <textarea name="comments" id="comments"><?php
    if($errors || $missing)
    {
      echo htmlentities($comments);
    }
    ?>
    </textarea>
  </p>
  <p>
    <input type="submit" name="send" id="send" value="Send Comments">
  </p>
</form>
<pre>
  <?php
  // displaying the content of a form. GET Is sent via URL and it appends it via the URL
  // POST doesn't append anything to the URL
  if($_GET)
  {
    echo 'Content of the $_GET array:<br>';
    print_r($_GET);
  }
  elseif($_POST)
  {
    echo 'Content of the $_POST array:<br>';
    print_r($_POST);
  }
  ?>
</pre>
</body>
</html>
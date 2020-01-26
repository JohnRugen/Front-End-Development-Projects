<?php

// Collection of variables
$firstName = "John";
$lastName = "Rugen";
$title = "American Gods";
$author = "Neil Geighman";
$answer = "42";
$newLines = "\r\n\r\n";


// '.' is concatination operatior
$fullName = "$firstName $lastName";
$book = "$title by $author";

//echo $fullName . "<br>";
//echo $book;

// adding to the variable $message by using concat equals (same as +=)
$message = "Name: $fullName $newLines";
$message .= "Book: $book $newLines";
$message .= "Answer: $answer";

echo $message;

?>
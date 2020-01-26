<?php
// Using heredoc syntax to avoid problems with quotes

$title = "The Hitchiker's Guide To The Galaxy";
$author = "Douglas Adams";
$android = "Marvin";
$brainSize = "the size of a planet";

// EOT = end of text, can be anything it's an identifier. NOTHING should be placed after the first instance of it. And it should be placed at the very end.
$heredoc = <<< EOT
In "$title" by $author, $android the "paranoid android"
complains that he's asked to do menial tasks, even
though he's got "a brain $brainSize.";
EOT;


echo $heredoc;
?>
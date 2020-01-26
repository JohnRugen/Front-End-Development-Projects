<?php
// Creating my own function

echo myConvertToMins(547)

function myConvertToMins($seconds)
{
    $sec = $seconds % 60; // get true seconds out of variable passed in 
    if(function_exists('intdiv')){ // does this function exist?
        $min = intdiv($seconds, 60); // call it 
    }
    else
    {
        $min = ($seconds - $sec) / 60; // if not, calculate it manually
    }

    //      if < 10  then    and 
    $sec = ($sec < 10) ? '0' . $sec : $sec; // if second is less than ten put a 0 and then the sec, if not just put sec
    // This is because if it was 8 and we want the classic clock format (10:08) it would put 10:8. So we need to add a 0 to keep it readable
    return "$min:$sec"; // return the result - NEEDED otherwise nothing will show.
}

?>
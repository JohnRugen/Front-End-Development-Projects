// ----------------------
// Checking off To-Dos by clicking on them
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});


//---------------------
// Deleting To-Dos by clicking on the X
$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation(); // stops the event from bubbling up (when click on an element that's contained with others it wont see it clicking on others)
})

//-----------------
// Creating To-Dos by typing and pressing Enter (asci code 13)
$("input[type='text']").keypress(function(){
    if(event.which===13){
        //grabbing new todo text from input
        var todoText = $(this).val();
        $(this).val("");
        // create a new li and append it to ul
        $("ul").append("<li><span><i class='fas fa-minus-circle'></i> </span>" + todoText + "</li>");
    }
});


//---------------
// Expanding the input when user clicks on the plus icon
$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
})
function(instance, properties, context) {
var $inputEl = $("#" + properties.inputID);
var $sendEl  = $("#" + properties.submitID);    
var refocus  = properties.Refocus;
    
if(!$inputEl.length){console.log("Error: Could not find an element with ID `" + properties.inputID + "`! Please verify you have entered the correct ID for the input element. ");}
if(!$sendEl.length){console.log("Error: Could not find an element with ID `" + properties.inputID + "`! Please verify you have entered the correct ID for the element which will receive the click trigger.");}

$inputEl.keydown(function(e) {
  //when enter is hit & not shift
  if (e.keyCode == 13 && !e.shiftKey) {
    e.preventDefault();
    console.log(
        "Enter keypress Multiline Input plugin just saw "
        + $inputEl[0].value
        + " in #"
        + $inputEl.attr("id")
        + " and triggered a click on #"
        + $sendEl.attr("id")
    );
    $inputEl.blur();//give Bubble the opportunity to see that this input has changed
    if($sendEl.length) {
      $sendEl.click();
      if(refocus) {
        //wait before resetting the value, so that Bubble has a chance to pick it up in the action. average time between keypresses is 76ms with a deviation of 22ms, so 50ms is the longest we can set this without risking missing the first letter of the next message
        setTimeout(function() { $inputEl.val('') }, 50);
        setTimeout(function() { $inputEl.focus(); }, 51);
      }
    } else {
       console.log("Error: Could not find an element with the ID `" + properties.submitID + "`!");
    }
  }
});}
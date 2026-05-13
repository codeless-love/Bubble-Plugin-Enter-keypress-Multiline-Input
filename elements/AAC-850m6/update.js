function(instance, properties, context) {
  var $inputEl = $("#" + properties.inputID);
  var $sendEl  = $("#" + properties.submitID);
  var refocus  = properties.Refocus;
  var refocusDelay  = 1;
      
  if(!$inputEl.length){console.warn("Error: Could not find an element with ID `" + properties.inputID + "`! Please verify you have entered the correct ID for the input element. ");}
  if(!$sendEl.length){console.warn("Error: Could not find an element with ID `" + properties.submitID + "`! Please verify you have entered the correct ID for the element which will receive the click trigger.");}

  // CLEANUP: Remove old listeners to prevent memory leaks and exponential firing
  $inputEl.off('keydown.enterPlugin');
  $sendEl.off('mousedown.enterPlugin touchstart.enterPlugin click.enterPlugin');

  // 1. MOUSE USER SNAPSHOT (Beat Bubble's click to the punch)
  // This updates the state BEFORE the physical click finishes, but DOES NOT clear the input yet.
  // If they click down but drag their mouse away to cancel, nothing breaks!
  $sendEl.on('mousedown.enterPlugin touchstart.enterPlugin', function() {
    instance.publishState('submittedText', $inputEl[0].value);
  });

  // 2. THE UNIVERSAL CLEAR & REFOCUS
  // This fires on physical mouse clicks AND when we programmatically trigger it with Enter
  $sendEl.on('click.enterPlugin', function() {
    if(refocus) {
      setTimeout(function() { $inputEl.val(''); }, refocusDelay);
      setTimeout(function() { $inputEl.focus(); }, (refocusDelay + 1));
    }
  });

  // 3. KEYBOARD USER SNAPSHOT & TRIGGER
  $inputEl.on('keydown.enterPlugin', function(e) {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      
      // Take the snapshot
      var inputValueWhenSubmitted = $inputEl[0].value;
      instance.publishState('submittedText', inputValueWhenSubmitted);
      
      $inputEl.blur(); // give Bubble the opportunity to see that this input has changed
      
      if($sendEl.length) {
        $sendEl.focus(); // belt and suspenders
        
        // This triggers Bubble's native workflow AND the universal clearing function above
        $sendEl.click(); 
      }
    }
  });
}

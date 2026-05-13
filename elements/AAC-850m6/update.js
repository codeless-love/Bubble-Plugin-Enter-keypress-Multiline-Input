function(instance, properties, context) {
    var inputID = properties.inputID;
    var submitID = properties.submitID;
    
    // Update the refocus setting in case the user changes it dynamically
    instance.data.refocus = properties.Refocus;

    // Only bind listeners if the IDs are new or haven't been bound yet
    if (instance.data.boundInputID !== inputID || instance.data.boundSubmitID !== submitID) {
        
        // 1. CLEANUP: If we previously bound listeners to old IDs, remove them first
        if (instance.data.boundInputID) {
            $("#" + instance.data.boundInputID).off('.enterPlugin');
        }
        if (instance.data.boundSubmitID) {
            $("#" + instance.data.boundSubmitID).off('.enterPlugin');
        }
        
        var $inputEl = $("#" + inputID);
        var $sendEl  = $("#" + submitID);

        if (!$inputEl.length) console.warn("Plugin Error: Input ID `" + inputID + "` not found.");
        if (!$sendEl.length) console.warn("Plugin Error: Submit ID `" + submitID + "` not found.");

        // 2. BIND SUBMIT BUTTON (Mousedown to beat Bubble's click listener)
        $sendEl.on('mousedown.enterPlugin touchstart.enterPlugin', function() {
            var text = instance.data.publishInputText($inputEl);
            console.log("-Direct button interaction published `" + text + "` before click.");
            
            if (instance.data.refocus) {
                setTimeout(function() { $inputEl.val('').trigger('input'); }, instance.data.refocusDelay);
                setTimeout(function() { $inputEl.focus(); }, instance.data.refocusDelay + 1);
            }
        });

        // 3. BIND INPUT ELEMENT (Enter key)
        $inputEl.on('keydown.enterPlugin', function(e) {
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                
                var text = instance.data.publishInputText($inputEl);
                console.log("-Enter keypress published `" + text + "`");
                
                $inputEl.blur();
                
                if ($sendEl.length) {
                    $sendEl.focus();
                    $sendEl.click(); // Trigger the actual workflow
                    
                    if (instance.data.refocus) {
                        setTimeout(function() { $inputEl.val('').trigger('input'); }, instance.data.refocusDelay);
                        setTimeout(function() { $inputEl.focus(); }, instance.data.refocusDelay + 1);
                    }
                }
            }
        });

        // 4. SAVE STATE: Record these IDs so we don't re-bind on the next update
        instance.data.boundInputID = inputID;
        instance.data.boundSubmitID = submitID;
    }
}
function(instance, context) {
    // Create an object to hold our dynamic variables so they persist across updates
    instance.data.boundInputID = null;
    instance.data.boundSubmitID = null;
    instance.data.refocusDelay = 1;
    
    // We'll store the logic for grabbing the text and publishing it here 
    // so we can reuse it easily without repeating code.
    instance.data.publishInputText = function($inputEl) {
        var text = $inputEl[0].value;
        instance.publishState('submittedText', text);
        return text;
    };
}
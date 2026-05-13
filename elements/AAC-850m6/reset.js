function(instance, context) {
    // Clear the input DOM element and tell Bubble it changed
    if (instance.data.boundInputID) {
        $("#" + instance.data.boundInputID).val('').trigger('input');
    }
    // Wipe the published state
    instance.publishState('submittedText', null);
}
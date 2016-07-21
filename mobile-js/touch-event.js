var getPointerEvent = function(event) {
    return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
};
var $touchArea = $('#idol_img_div'),
    touchStarted = false, // detect if a touch event is sarted
    currX = 0,
    currY = 0,
    cachedX = 0,
    cachedY = 0;

//setting the events listeners
$touchArea.on('touchstart mousedown',function (e){
    e.preventDefault(); 
    var pointer = getPointerEvent(e);
    // caching the current x
    cachedX = currX = pointer.pageX;
    // caching the current y
    cachedY = currY = pointer.pageY;
    // a touch event is detected      
    touchStarted = true;
    //$touchArea.text('Touchstarted');
    // detecting if after 200ms the finger is still in the same position
    setTimeout(function (){
        if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
            // Here you get the Tap event
            //$touchArea.text('Tap');

            waifuClick();
        }
    },200);
});
$touchArea.on('touchend mouseup touchcancel',function (e){
    e.preventDefault();
    // here we can consider finished the touch event
    touchStarted = false;
    //$touchArea.text('Touchended');
});
$touchArea.on('touchmove mousemove',function (e){
    e.preventDefault();
    var pointer = getPointerEvent(e);
    currX = pointer.pageX;
    currY = pointer.pageY;
    if(touchStarted) {
         // here you are swiping
         //$touchArea.text('Swiping');
    }
   
});
/**
 * Created by zzdy on 2017/5/25.
 */
/**
 @param {Element} element
 */
    function style_(element) {
        if(element.currentStyle){
            return element.currentStyle;
        }else {
            return window.getComputedStyle(element,null);
        }
    }

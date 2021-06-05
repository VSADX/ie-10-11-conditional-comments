function enable_internet_explorer_cc() {
    function is_ie_version() {
        var ua = navigator.userAgent
    
        var msie = ua.indexOf('MSIE ')
        if (msie > 0)
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
    
        var trident = ua.indexOf('Trident/')
        if (trident > 0) {
            var rv = ua.indexOf('rv:')
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
        }
        return false
    }
    if(is_ie_version() < 9) return // exit for IE 5 - 9 or other browser

    /** @param {Document} context */
    function get_all_comments(context) {
        var comments = []
        var elementPath = [context || document]
        while (elementPath.length > 0) {
            var el = elementPath.pop()
            for (var i = 0; i < el.childNodes.length; i++) {
                var node = el.childNodes[i]

                if (node.nodeType === 8) // magic number for comment node
                    comments.push(node)
                else elementPath.push(node)
            }
        }
        return comments
    }
    var comments = get_all_comments()
    if(!comments || !comments.length) return // exit for no comments here

    /** @param {HTMLDivElement} temp */
    function allow_scripts_from_comments(temp) {
        var scripts = temp.getElementsByTagName("script")
        for (let i = 0; i < scripts.length; i++) {
            var s = scripts[i]
            var script = document.createElement("script")
            script.innerHTML = s.innerHTML
            s.parentElement.replaceChild(script, s)
        }
    }

    /** @param {Comment} comment */
    function internet_explorer_cc_enable(comment) {
        var html = comment.nodeValue
        var start = html.indexOf("[if IE 12]")
        if(start < 0) return 

        var temp = document.createElement("div")
        temp.innerHTML = html.substring(html.indexOf(">") + 1, html.lastIndexOf("<!"))

        allow_scripts_from_comments(temp)

        while(temp.firstChild) 
            comment.parentElement.insertBefore(temp.removeChild(temp.firstChild), comment)
    }
  
    for (var i = 0; i < comments.length; i++) 
        internet_explorer_cc_enable(comments[i])        
        
}
enable_internet_explorer_cc()

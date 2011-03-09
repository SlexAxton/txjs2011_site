(function(global) {
				var kkeys = [ ],
					  knm   = "38,38,40,40,37,39,37,39,66,65",
					  doc   = document;
				
				function rofl(lol){return lol.split('').reverse().join('');}
				function keydown(e) {
					kkeys.push(e.which);
					if (kkeys.join(',').indexOf(knm) > -1) {
						$(doc).unbind('keydown', keydown);
						(function() {
                                                  if ( ! window || ! window.history || ! window.history.replaceState ) {
                                                    return false;
                                                  }
        var i       = 0,
            message = rofl("nIpeeD' edoC nopuoC esU oT elpoeP 05 tsriF ehT---") + 
                      rofl("---.elas no og stekcit nehw tnuocsid a teg lliw 'traeHehT");
        var loop = setInterval(function() {
                var scroller = message.substring(i) + message.substring(0, i);
                scroller = scroller.replace(/ /g, "-");
                window.history.replaceState('', 'scroller', '/' + scroller);
                i++;
                if ( i === message.length ) {
                  clearInterval( loop );
                }
        }, 100);
 })();					}
				}			 
				$(doc).keydown(keydown);
			})(this);

function test() {
    var span,
        d = document,
        li,
        a,
        i,
        lis = d.getElementById('cesu').getElementsByTagName('li');
    for (i = 0; li = lis[i++];) {
        a = li.getElementsByTagName('a')[0];
        if (!a) {
            continue;
        }
        span = d.createElement('span');
        span.ctime = new Date();
        span.style.display = 'none';
        span.innerHTML = '测速中...<img src="' + a.href + '" border="0" width="1" height="1" onerror="testresult(this)" />';
        li.appendChild(span);

        (function(currentSpan, currentLi) {
            setTimeout(function() {
                if (!currentSpan.getAttribute('data-tested')) {
                    currentSpan.setAttribute('data-tested', 'true');
                    $(currentLi).find('.miaoinpt1').html('<span style="color: red;">超时</span>');
                }
            }, 10000);
        })(span, li);
    }
};

function testresult(img) {
    var span = img.parentNode;
    if (span.getAttribute('data-tested')) {
        return;
    }
    span.setAttribute('data-tested', 'true');

    var n = 'em';
    if (!testresult.isrun) {
        n = 'span';
        testresult.isrun = true;
    }
    var timeDiff = new Date() - span.ctime;
    if (timeDiff >= 10000) {
        $(span).parents('li').find('.miaoinpt1').html('<span style="color: red;">超时</span>');
    } else {
        $(span).parents('li').find('.miaoinpt1').html(timeDiff + 'ms');
    }
    span.innerHTML = '<' + n + '>' + (timeDiff / 1000) + '秒</' + n + '>';
};
var ran = Math.random();
test();
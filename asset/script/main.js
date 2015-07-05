(function () {
    'use strict';

    var templates = {};

    if (!isSupportedBrowser()) {
        document.getElementById('unsupported').style.display = 'block';
        return;
    }

    document.body.onload = initPage;

    function initPage () {
        initTemplates();
        initControls();
    }

    function initTemplates () {
        $('[data-template]').each(function () {
            var name = this.getAttribute('data-template');
            var template = Hogan.compile(this.innerHTML, {delimiters: '{ }'});
            templates[name] = template;
        });
    }

    function initControls () {
        cuff.controls.postInput = postInputControl;
        cuff.controls.issuesOutput = issuesOutputControl;
        cuff.controls.countOutput = countOutputControl;
        cuff();
    };

    function postInputControl (element) {
        var $document = $(document);
        var $element = $(element);
        var lastLintId;
        $element.on('keyup', function () {
            var results = joblint(element.value);
            var lintId = generateLintId(results);
            if (!lastLintId || lintId !== lastLintId) {
                lastLintId = lintId;
                $document.trigger('lint-results', results);
            }
        });
    };

    function issuesOutputControl (element) {
        $(document).on('lint-results', function (event, results) {
            element.innerHTML = templates.issues.render(results, templates);
        });
    };

    function countOutputControl (element) {
        var countElements = {};
        var countElementsArray = [];
        $(element).find('[data-role=count]').each(function () {
            var type = this.getAttribute('data-type');
            countElements[type] = this;
            countElementsArray.push(this);
        });
        $(document).on('lint-results', function (event, results) {
            countElementsArray.forEach(function (countElement) {
                countElement.innerHTML = 0;
            });
            Object.keys(results.counts).forEach(function (type) {
                if (countElements[type]) {
                    countElements[type].innerHTML = results.counts[type];
                }
            });
        });
    };

    function generateLintId (results) {
        return JSON.stringify(results);
    }

    function isSupportedBrowser () {
        var supports = {
            events: (typeof document.addEventListener !== 'undefined'),
            querySelector: (typeof document.querySelectorAll !== 'undefined'),
            forEach: (typeof Array.prototype.forEach !== 'undefined')
        };
        return (supports.events && supports.querySelector && supports.forEach);
    }

}());

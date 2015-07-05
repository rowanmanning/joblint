(function () {
    'use strict';

    var templates = {};

    if (!isSupportedBrowser()) {
        document.getElementById('unsupported').style.display = 'block';
        return;
    }

    $(initPage);

    function initPage () {
        initTemplates();
        initControls();
    }

    function initTemplates () {
        $('[data-template]').each(function () {
            var name = this.getAttribute('data-template');
            var template = Hogan.compile(this.innerHTML, {
                delimiters: '{ }'
            });
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
                saveSession(element.value);
                $document.trigger('lint-results', results);
            }
        });
        var session = loadSession();
        if (session) {
            element.value = loadSession();
            setTimeout(function () {
                $element.trigger('keyup');
            }, 1);
        }
    };

    function issuesOutputControl (element) {
        $(document).on('lint-results', function (event, results) {
            results.issues.forEach(function (issue) {
                var occuranceHtml = templates.occurance.render(issue);
                issue.contextHtml = issue.context.replace('{{occurance}}', occuranceHtml);
            });
            element.innerHTML = templates.issues.render(results, templates);
        });
    };

    function countOutputControl (element) {
        var counters = {};
        var countersArray = [];
        $(element).find('[data-role=count]').each(function () {
            var type = this.getAttribute('data-type');
            var count = {
                bar: this.querySelector('[data-role=bar]'),
                number: this.querySelector('[data-role=number]')
            }
            counters[type] = count;
            countersArray.push(count);
        });
        $(document).on('lint-results', function (event, results) {
            countersArray.forEach(function (count) {
                count.number.innerHTML = 0;
                count.bar.style.width = 0;
            });
            Object.keys(results.counts).forEach(function (type) {
                if (counters[type]) {
                    counters[type].number.innerHTML = results.counts[type];
                    counters[type].bar.style.width = (results.counts[type] * 2) + '%';
                }
            });
        });
    };

    function generateLintId (results) {
        return JSON.stringify(results);
    }

    function saveSession (postContent) {
        if (typeof window.localStorage !== 'undefined') {
            localStorage.setItem('post', postContent);
        }
    }

    function loadSession () {
        if (typeof window.localStorage !== 'undefined') {
            return localStorage.getItem('post');
        }
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

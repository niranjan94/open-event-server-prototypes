interact('.session')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        // enable autoScroll
        autoScroll: true,
        // call this function on every dragmove event
        onmove: function (event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        },
        // call this function on every dragend event
        onend: function (event) {

        }
    });


interact('.room-inner').dropzone({
    // only accept elements matching this CSS selector
    accept: '.session',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.50,

    ondropactivate: function (event) {
        event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
        event.target.classList.add('drop-now');
    },
    ondragleave: function (event) {
        event.target.classList.remove('drop-now');
    },
    ondrop: function (event) {
        event.relatedTarget.classList.remove('unscheduled');
        event.relatedTarget.classList.add('scheduled');
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-now');

    },
    ondropdeactivate: function (event) {
        event.target.classList.remove('drop-now');
        event.target.classList.remove('drop-active');
    }
});
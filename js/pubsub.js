//events - a super-basic Javascript (publish subscribe) pattern
//https://gist.github.com/learncodeacademy/777349747d8382bfb722
//changed to be able to use closure for the events array
//watch de usage here: https://www.youtube.com/playlist?list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f

//code pen with usage (JQUERY): https://codepen.io/anon/pen/LVXrao

export const events = (function () {

    const events = {};

    function on(eventName, fn) {

        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    }

    function off(eventName, fn) {

        if (events[eventName]) {

            for (let i = 0; i < events[eventName].length; i++) {

                if (events[eventName][i] === fn) {
                    events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }

    function emit(eventName, data) {

        if (events[eventName]) {

            events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    }

    return {

        on: on,
        off: off,
        emit: emit
    };

})();
// a wrapper around getStats which hides the differences (where possible)
// following code-snippet is taken from somewhere on the github
function getStatsWrapper(cb) {
    // if !peer or peer.signalingState == 'closed' then return;

    if (typeof window.InstallTrigger !== 'undefined' || isSafari) { // maybe "isEdge?"
        peer.getStats(window.mediaStreamTrack || null).then(function(res) {
            var items = [];
            res.forEach(function(r) {
                items.push(r);
            });
            cb(items);
        }).catch(cb);
    } else {
        peer.getStats(function(res) {
            var items = [];
            res.result().forEach(function(res) {
                var item = {};
                res.names().forEach(function(name) {
                    item[name] = res.stat(name);
                });
                item.id = res.id;
                item.type = res.type;
                item.timestamp = res.timestamp;
                items.push(item);
            });
            cb(items);
        });
    }
};

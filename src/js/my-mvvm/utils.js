const _slice = Array.prototype.slice;

export function toArray(list) {
    return _slice.call(list);
}
export function replaceNode(target, el) {
    target.parentNode.replaceChild(el, target)
}
let uid = 0;

function Dep() {
    this.id = uid++;
    this.subscription = [];
}

Dep.target = null

Dep.prototype.addSub = function (sub) {
    this.subscription.push(sub)
}

Dep.prototype.depend = function () {
    Dep.target && Dep.target.addDep(this)
}

Dep.prototype.notify = function () {
    this.subscription.forEach((sub) => {
        sub.update()
    })
}
export default Dep;
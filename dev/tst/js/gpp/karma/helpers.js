function toBeFunction() {
    return this.actual !== undefined && angular.isFunction(this.actual);
}

beforeEach(function() {
    this.addMatchers({
        toBeFunction: toBeFunction
    });
});

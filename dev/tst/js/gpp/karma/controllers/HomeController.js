describe("Controllers", function() {
    beforeEach(module("Application.Controllers"));

    var controller, scope;

    describe("HomeController", function() {
        beforeEach(inject(function($controller) {
            scope = {};
            controller = $controller("HomeController", {$scope: scope});
        }));

        it("should be defined", function() {
            expect(controller).toBeDefined();
        });

        it("should have a todo method", function() {
            expect(scope.todo).toBeFunction();
        });
    });
});
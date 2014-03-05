describe("Controllers", function() {
    beforeEach(module("Application.Controllers", "LocalStorageModule"));

    var controller, scope;

    describe("HomeController", function() {
        beforeEach(inject(function($controller) {
            scope = {};
            controller = $controller("HomeController", {$scope: scope});
        }));

        it("should be defined", function() {
            expect(controller).toBeDefined();
        });

        it("should have a posts array", function() {
            expect(scope.posts).toBeDefined;
        });

        it("should have a posts method which returns an array of posts", function() {
            expect(scope.posts.length).toEqual(3);
        });
    });
});
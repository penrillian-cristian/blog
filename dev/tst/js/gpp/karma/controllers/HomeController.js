/*
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
*/

describe("Controllers", function () {
    beforeEach(module("Application.Controllers", "LocalStorageModule"));

    var controller, scope;
    describe("HomeController", function () {
        beforeEach(inject(function ($controller) {
            scope = {};
            controller = $controller("HomeController", {$scope: scope});

            //TODO: change localStorage to localStorageService
            //localStorageService.clear;
            localStorage.clear();
        }));

        it("should be defined", function () {
            expect(controller).toBeDefined();
        });

        it("should have a posts array", function () {
            expect(scope.posts).toBeDefined;
        });


        it("should have a posts method which returns an array of posts", function () {
            expect(scope.posts.length).toEqual(3);
        });

        it("should store login and password", function () {
            scope.register("username", "password", "me@example.com");
            expect(scope.registerResultString).toEqual("Registration was successful");

            //expect(scope.localStorageService.getpassword).toEqual("password");

            scope.register("username1", "password1", "me@example.com");
            scope.login("username1","password1");
            expect(scope.loginResultString).toBe("Login was successful");

            scope.register("username2", "password2", "me@example.com");
            scope.login("username2","password2");
            expect(scope.loginResultString).toBe("Login was successful");

            scope.register("username3", "password3", "me@example.com");
            scope.login("username3","password3");
            expect(scope.loginResultString).toBe("Login was successful");

//            expect(scope.login("username1","password1.toEqual("password1");
//            expect(scope.loginDetails[1].password).toEqual("password1");
//            expect(scope.loginDetails[2].username).toEqual("username2");
//            expect(scope.loginDetails[2].password).toEqual("password2");
//            expect(scope.loginDetails[3].username).toEqual("username3");
//            expect(scope.loginDetails[3].password).toEqual("password3");
        });

        it("should print 'Required fields are empty' when one of the fields is empty", function () {
            scope.login("", "");
            expect(scope.loginResultString).toEqual("Required fields are empty");
        });

        it("should print 'Invalid username or password' when there are no registered users", function () {

            scope.login("username", "password");
            expect(scope.loginResultString).toEqual("Invalid username or password");
        });

        it("should print 'Invalid username or password' when username or password don't match values from database", function () {
            scope.register("username1", "password2", "me@example.com");
            scope.login("username2", "password2");
            expect(scope.loginResultString).toEqual("Invalid username or password");
        });

        xit("should print 'Password must have at least 8 characters' when user wants to register", function () {
            scope.register("username", "pass", "me@example.com");
            expect(scope.output).toEqual("Password must have at least 8 characters");

            scope.register("username", "p", "me@example.com");
            expect(scope.output).toEqual("Password must have at least 8 characters");

            scope.register("username", "passwor", "me@example.com");
            expect(scope.output).toEqual("Password must have at least 8 characters");

            scope.register("username", "1234567", "me@example.com");
            expect(scope.output).toEqual("Password must have at least 8 characters");

            scope.register("username", "<>:@{}_", "me@example.com");
            expect(scope.output).toEqual("Password must have at least 8 characters");
        });

        xit("should print 'Email has wrong format' when there is no '@' or '.' symbol", function () {
            scope.register("username", "password", "email@com", "me@example.com");
            expect(scope.result).toEqual("Email has wrong format");

            scope.register("username", "password", "email.com", "me@example.com");
            expect(scope.result).toEqual("Email has wrong format");

            scope.register("username", "password", "emailcom", "me@example.com");
            expect(scope.result).toEqual("Email has wrong format");
        });

        it("should print 'Login was successful' when user login successfully", function () {
            scope.register("username", "password", "me@example.com");
            scope.login("username", "password");
            expect(scope.loginResultString).toEqual("Login was successful");

            scope.register("username1", "password1", "me@example.com");
            scope.register("username2", "password2", "me@example.com");
            scope.register("username3", "password3", "me@example.com");
            scope.login("username2", "password2");
            expect(scope.loginResultString).toEqual("Login was successful");
        });

        it("should print 'Username already taken' when user tries to register with username being already used", function () {
            scope.register("username1", "password1", "me@example.com");
            scope.register("username1", "password2", "me@example.com");
            expect(scope.registerResultString).toEqual("Username already taken");

            scope.register("username2", "password3", "me@example.com");
            scope.register("username2", "password3", "me@example.com");
            expect(scope.registerResultString).toEqual("Username already taken");
        });

        it("every post ID should be higher than 0", function () {
            expect(scope.posts[0].id).toBeGreaterThan(-1);
        });

        it("every post should have an ID, title, date, author, category and content", function () {
            expect(scope.posts[0]).toBeDefined;
            expect(scope.posts[1]).toBeDefined;
            expect(scope.posts[2]).toBeDefined;
            expect(scope.posts[3]).toBeDefined;
            expect(scope.posts[4]).toBeDefined;
            expect(scope.posts[5]).toBeDefined;
        });


    });
});
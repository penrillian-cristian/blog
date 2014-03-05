describe("Controllers", function () {
    beforeEach(module("Application.Controllers"));
    describe("Controllers", function () {
        beforeEach(module("Application.Controllers", "LocalStorageModule"));

        var controller, scope;

        describe("HomeController", function () {
            beforeEach(inject(function ($controller) {

                describe("HomeController", function () {
                    beforeEach(inject(function ($controller) {
                        scope = {};
                        controller = $controller("HomeController", {$scope: scope});
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
                        scope.register("username", "password");
                        expect(scope.loginDetails[0].username).toEqual("username");

                        expect(scope.loginDetails[0].password).toEqual("password");

                        scope.register("username1", "password1");
                        scope.register("username2", "password2");
                        scope.register("username3", "password3");
                        expect(scope.loginDetails[1].username).toEqual("username1");
                        expect(scope.loginDetails[1].password).toEqual("password1");
                        expect(scope.loginDetails[2].username).toEqual("username2");
                        expect(scope.loginDetails[2].password).toEqual("password2");
                        expect(scope.loginDetails[3].username).toEqual("username3");
                        expect(scope.loginDetails[3].password).toEqual("password3");
                    });

                    it("should print Required fields are empty when one of the fields is empty", function () {
                        scope.login("", "");
                        expect(scope.result).toEqual("Required fields are empty");
                    });

                    it("should print Invalid username or password when there are no registered users", function () {
                        scope.login("username", "password");
                        expect(scope.result).toEqual("Invalid username or password");
                    });

                    it("should print Invalid username or password when username or password don't match values from database", function () {
                        scope.register("username1", "password2");
                        scope.login("username2", "password2");
                        expect(scope.result).toEqual("Invalid username or password");
                    });

                    it("should print Password must have at least 8 characters when user wants to register", function () {
                        scope.register("username", "pass");
                        expect(scope.result).toEqual("Password must have at least 8 characters");

                        scope.register("username", "p");
                        expect(scope.result).toEqual("Password must have at least 8 characters");

                        scope.register("username", "passwor");
                        expect(scope.result).toEqual("Password must have at least 8 characters");

                        scope.register("username", "1234567");
                        expect(scope.results).toEqual("Password must have at least 8 characters");

                        scope.register("username", "<>:@{}_");
                        expect(scope.results).toEqual("Password must have at least 8 characters");
                    });

                    it("should print Email has wrong format when there is no '@' or '.' symbol", function () {
                        scope.register("username", "password", "email@com");
                        expect(scope.result).toEqual("Email has wrong format");

                        scope.register("username", "password", "email.com");
                        expect(scope.result).toEqual("Email has wrong format");

                        scope.register("username", "password", "emailcom");
                        expect(scope.result).toEqual("Email has wrong format");
                    });

                    it("should print Login was successful when user login successfully", function () {
                        scope.register("username", "password");
                        scope.login("username", "password");
                        expect(scope.result).toEqual("Login was successful");

                        scope.register("username1", "password1");
                        scope.register("username2", "password2");
                        scope.register("username3", "password3");
                        scope.login("username2", "password2");
                        expect(scope.result).toEqual("Login was successful");
                    });

                    it("should print Username already taken when user tries to register with username being already used", function () {
                        scope.register("username1", "password1");
                        scope.register("username1", "password2");
                        expect(scope.result).toEqual("Username already taken");

                        scope.register("username2", "password3");
                        scope.register("username2", "password3");
                        expect(scope.result).toEqual("Username already taken");
                    });

                    it("every post ID should be higher than 0", function () {
                        expect(scope.posts.length).toBeGreaterThan(0);
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
            }))
        });
    })
})



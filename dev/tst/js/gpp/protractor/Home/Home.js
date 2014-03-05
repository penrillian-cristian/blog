describe("Given I have an open browser", function () {
    ptor = protractor.getInstance();//

    describe("When I navigate to the home page", function () {
        ptor.get("#/");


        it("should have the expected title", function () {
            var title = ptor.getTitle();
            expect(title).toEqual("Blog");

        });

        it("should have the expected welcome message", function () {
            var welcomeElement = ptor.findElement(protractor.By.className("blog-title"));
            expect(welcomeElement.getText()).toEqual("Welcome to our Blog");

        });

        it("should have 3 posts", function () {
            ptor.findElements(protractor.By.className("post")).then(function (postElements) {
                expect(postElements.length).toEqual(3);
            });
        });


        it("should have a login and register button", function () {
            var loginButton = ptor.findElement(protractor.By.name("loginButton"));
            var registerButton = ptor.findElement(protractor.By.name("registerButton"));

            expect(loginButton.getTagName()).toBe("button");
            expect(registerButton.getTagName()).toBe("button");

            expect(loginButton.getText()).toBe("Login");
            expect(registerButton.getText()).toBe("Register");

        });


        it("should have 2 empty fields for login and 3 for register", function () {
            var logUsernameField = ptor.findElement(protractor.By.name("loginUsernameField"));
            var logPasswordField = ptor.findElement(protractor.By.name("loginPasswordField"));

            var regUsernameField = ptor.findElement(protractor.By.name("registerUsernameField"));
            var regPasswordField = ptor.findElement(protractor.By.name("registerPasswordField"));
            var regEmailField = ptor.findElement(protractor.By.name("registerEmailField"));

            expect(logUsernameField.getTagName()).toBe("input");
            expect(logPasswordField.getTagName()).toBe("input");

            expect(regUsernameField.getTagName()).toBe("input");
            expect(regPasswordField.getTagName()).toBe("input");
            expect(regEmailField.getTagName()).toBe("input");
        });

        //TODO: move to unit testing ??
        it("registered user should provide a valid email address", function () {
            var userEmail = ptor.findElement(protractor.By.name("registerEmailField"));
            var test = false;

            //userEmail.indexOf("f");
            /* if (userEmail.getText().contains("@") && userEmail.getText().contains(".")) {
             test = true;
             }
             expect(test);*/
        });

        it("should print 1 category for each post", function () {
            var category = ptor.findElement(protractor.By.name("postCategory")).then(function (category) {
                expect(category.length).toEqual(1);
            });
            expect()

        });
    });

    describe("When user logged in", function () {
        beforeEach(inject(function ($controller) {
            scope = {};
            controller = $controller("HomeController", {$scope: scope});
            scope.login("username", "password");
        }));

        it("should hide login button and its fields after user logged in", function () {
            var loginButton = ptor.findElement(protractor.By.name("loginButton"));
            var logUsernameField = ptor.findElement(protractor.By.name("loginUsernameField"));
            var logPasswordField = ptor.findElement(protractor.By.name("loginPasswordField"));

            expect(loginButton).toBeUndefined;
            expect(logUsernameField).toBeUndefined;
            expect(logPasswordField).toBeUndefined;

        });

        it("user should be able to write a new post", function () {

        });

        it("user should be able to change own email", function () {

        });

        it("should be possible to remove post by the registered user", function () {
            var post = ptor.findElement(protractor.By.name("posts"));

            expect(post).toBeUndefined;
        });
        describe("When user is writing a new post", function () {
            it("should be possible to write a post", function () {

            });

            it("should be possible to add images", function () {

            });
            it("should be possible to set the author, date and category", function () {

            });

        });
        describe("When new post is created", function () {
            it("should increase a number of posts by 1", function () {
                var post = ptor.findElement(protractor.By.name("posts"));

                expect(post.length).toBe(post.length+1);
            });
            it("should create a post with ID= highest ID +1", function () {
                var post = ptor.findElement(protractor.By.name("posts"));
                var ID = ptor.findElement(protractor.By.name("ID"));

                expect(posts.length.ID).toBe(ID+2);
            });
            it("should be possible to read a post", function () {

            });
            it("should be possible to edit a post", function () {

            });

        })
    });
});
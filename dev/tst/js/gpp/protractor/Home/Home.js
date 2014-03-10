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


        it("should have 2 empty fields for login and 2 for register", function () {
            var logUsernameField = ptor.findElement(protractor.By.name("loginUsernameField"));
            var logPasswordField = ptor.findElement(protractor.By.name("loginPasswordField"));

            var regUsernameField = ptor.findElement(protractor.By.name("registerUsernameField"));
            var regPasswordField = ptor.findElement(protractor.By.name("registerPasswordField"));
            //var regEmailField = ptor.findElement(protractor.By.name("registerEmailField"));

            expect(logUsernameField.getTagName()).toBe("input");
            expect(logPasswordField.getTagName()).toBe("input");

            expect(regUsernameField.getTagName()).toBe("input");
            expect(regPasswordField.getTagName()).toBe("input");
            //expect(regEmailField.getTagName()).toBe("input");
        });

        //TODO: move to unit testing ??
        xit("registered user should provide a valid email address", function () {
            var userEmail = ptor.findElement(protractor.By.name("registerEmailField"));
            var test = false;

            //userEmail.indexOf("f");
            /* if (userEmail.getText().contains("@") && userEmail.getText().contains(".")) {
             test = true;
             }
             expect(test);*/
        });

        xit("should print 1 category for each post", function () {
            var category = ptor.findElement(protractor.By.name("postCategory")).then(function (category) {
                expect(category.length).toEqual(1);
            });
            expect()

        });
    });
    /*
    xdescribe("When user logged in", function () {
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
        xdescribe("When user is writing a new post", function () {
            it("should be possible to write a post", function () {

            });

            it("should be possible to add images", function () {

            });
            it("should be possible to set the author, date and category", function () {

            });

        });
        xdescribe("When new post is created", function () {
            it("should increase a number of posts by 1", function () {
                var post = ptor.findElement(protractor.By.name("posts"));

                expect(post.length).toBe(post.length + 1);
            });
            it("should create a post with ID= highest ID +1", function () {
                var post = ptor.findElement(protractor.By.name("posts"));
                var ID = ptor.findElement(protractor.By.name("ID"));

                expect(scope.posts.length.ID).toBe(ID + 2);
            });
            it("should be possible to read a post", function () {

            });
            it("should be possible to edit a post", function () {

            });

        });
        */

        describe("When user presses next", function () {
            /*beforeEach(inject(function ($controller) {
                scope = {};
                controller = $controller("HomeController", {$scope: scope});
                scope.login("username", "password");
            }));*/
            /*scope.register("username", "password");
            scope.login("username", "password");
            //var okButton = ptor.findElement(protractor.By.name("okWrite"));
            //okButton.click();
            scope.writePost("postTitle1", "postCategory","postContent");
            scope.writePost("postTitle2", "postCategory", "postContent");
            scope.writePost("postTitle3", "postCategory", "postContent");


            var nextButton = ptor.findElement(protractor.By.name("nextButton"));
            nextButton.click();*/
            it("should show between 1 and 5 posts", function () {
                var registerButton = ptor.findElement(protractor.By.name("registerButton"));
                registerButton.click();
                var userRegisterField = ptor.findElement(protractor.By.name("registerUsernameField"));
                userRegisterField.sendKeys("ci");
                var passwordRegisterField = ptor.findElement(protractor.By.name("registerPasswordField"));
                passwordRegisterField.sendKeys("abc");
                var registerConfirmButton = ptor.findElement(protractor.By.name("registerConfirm"));
                registerConfirmButton.click();
                //scope.writePost("postTitle1", "postCategory","postContent");
                //scope.writePost("postTitle2", "postCategory", "postContent");
                //scope.writePost("postTitle3", "postCategory", "postContent");

                for(var i =0; i<8; i++){
                    var writePostButton = ptor.findElement(protractor.By.name("writePost"));
                    writePostButton.click();
                    var postTitle = ptor.findElement(protractor.By.model("postTitle"));
                    postTitle.clear();
                    postTitle.sendKeys("Test post "+i);
                    var postCategory = ptor.findElement(protractor.By.model("postCategory"));
                    postCategory.clear();
                    postCategory.sendKeys("Technology");
                    var postText = ptor.findElement(protractor.By.model("postText"));
                    postText.clear();
                    postText.sendKeys("I am writing a blog post");
                    var writeOk = ptor.findElement(protractor.By.name("writeOk"));
                    writeOk.click();
                }
                var nextButton = ptor.findElement(protractor.By.name("nextButton"));
                nextButton.click();

                ptor.findElements(protractor.By.className("post")).then(function (postElements) {
                    expect(postElements.length).toBeGreaterThan(0);
                    expect(postElements.length).toBeLessThan(6);
                });
            });

        });


        describe("When user presses previous", function () {
            it("there should be between 1 and 5 posts", function () {
                var previousButton = ptor.findElement(protractor.By.name("previousButton"));
                previousButton.click();
                ptor.findElements(protractor.By.className("post")).then(function (postElements) {
                    expect(postElements.length).toBeGreaterThan(0);
                    expect(postElements.length).toBeLessThan(6);
                });
            });

        });


   // });
});
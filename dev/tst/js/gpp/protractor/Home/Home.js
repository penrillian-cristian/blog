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

        var testButtons;
        it("should have a login and register button", testButtons = function () {
            var loginButton = ptor.findElement(protractor.By.name("loginButton"));
            var registerButton = ptor.findElement(protractor.By.name("registerButton"));

            expect(loginButton.getTagName()).toBe("button");
            expect(registerButton.getTagName()).toBe("button");

            expect(loginButton.getText()).toBe("Login");
            expect(registerButton.getText()).toBe("Register");

        });

        var testFields;
        it("should have 2 empty fields for login", testFields = function () {
            var logUsernameField = ptor.findElement(protractor.By.name("loginUsernameField"));
            var logPasswordField = ptor.findElement(protractor.By.name("loginPasswordField"));
            //expect(logUsernameField).toBeDefined();
            //expect(logPasswordField).toBeDefined();

            expect(logUsernameField.getTagName()).toBe("input");
            expect(logPasswordField.getTagName()).toBe("input");


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

        describe("When I click login", function () {


            it("should return an error message if the fields are empty", function () {
                var loginButton = ptor.findElement(protractor.By.name("loginButton"));
                loginButton.click();
                var loginResult = ptor.findElement(protractor.By.name("loginResult"));
                expect(loginResult.getText()).toBe("Required fields are empty");
            });

            it("should return an error message if the user is not registered", function () {
                var userLoginField = ptor.findElement(protractor.By.name("loginUsernameField"));
                userLoginField.sendKeys("ci");
                var passwordLoginField = ptor.findElement(protractor.By.name("loginPasswordField"));
                passwordLoginField.sendKeys("abc");

                var loginButton = ptor.findElement(protractor.By.name("loginButton"));
                loginButton.click();
                var loginResult = ptor.findElement(protractor.By.name("loginResult"));
                expect(loginResult.getText()).toBe("Invalid username or password");

            });
        });


        describe("When I click register", function () {


            it("should have 2 empty fields for register, one OK button, and one Cancel button ", function () {

                var registerButton = ptor.findElement(protractor.By.name("registerButton"));
                registerButton.click();

                var regUsernameField = ptor.findElement(protractor.By.name("registerUsernameField"));
                var regPasswordField = ptor.findElement(protractor.By.name("registerPasswordField"));
                var registerConfirmButton = ptor.findElement(protractor.By.name("registerConfirm"));
                var registerCancelButton = ptor.findElement(protractor.By.name("registerCancel"));

                expect(regUsernameField.getTagName()).toBe("input");
                expect(regPasswordField.getTagName()).toBe("input");
                expect(registerConfirmButton.getTagName()).toBe("button");
                expect(registerCancelButton.getTagName()).toBe("button");

            });

            it("should return an error message if the fields are empty", function () {

                var registerButton = ptor.findElement(protractor.By.name("registerConfirm"));
                registerButton.click();
                var registerResult = ptor.findElement(protractor.By.name("registerResult"));
                expect(registerResult.getText()).toBe("Required fields are empty");

            });


            it("should print confirmation, write post button and welcome message if registration is successful, together with logout button", function() {
                var userRegisterField = ptor.findElement(protractor.By.name("registerUsernameField"));
                userRegisterField.sendKeys("ci");
                var passwordRegisterField = ptor.findElement(protractor.By.name("registerPasswordField"));
                passwordRegisterField.sendKeys("abc");
                var registerConfirmButton = ptor.findElement(protractor.By.name("registerConfirm"));
                registerConfirmButton.click();
                var registerResult = ptor.findElement(protractor.By.name("registerResult"));
                expect(registerResult.getText()).toBe("Registration was successful");
                var welcomeText = ptor.findElement(protractor.By.name("welcomeText"));
                var logoutButton = ptor.findElement(protractor.By.name("logoutButton"));
                expect(welcomeText.getText()).toBe("Welcome ci!");
                expect(logoutButton.getTagName()).toBe("button");
                var writePost = ptor.findElement(protractor.By.name("writePost"));
                expect(writePost.getTagName()).toBe("button");

            });


        });

        describe("When I click logout", function () {
            it("should show back the login screen and hide write ", function(){
               var logoutButton = ptor.findElement(protractor.By.name("logoutButton"));
               logoutButton.click();
               testButtons();
               testFields();
               var writePost = ptor.findElement(protractor.By.name("writePost"));
               expect(writePost.getText()).toBe("");

            });
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


    // when logout, fields should become empty and no write post button should be present
    // when user press register and enters same usrname, error message should be displayed
    // when user presses login with same details, he should succesfully login and write post button present
    // when user presses write post, fields should appear
    // NOT IMPLEMENTED: when user presses cancel, should go back to main screen
    // user presses write post, then completes fields and clicks ok
    // NOT IMPLEMENTED: if one field is empty, error message should appear
    // otherwise, when user clicks ok, post should be added to the list (eg. list size bigger than 1?)
    // when month is selected, all div elements of class post should have corresponding month name
    // when show all is pressed, all posts should be present

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
        xit("should show between 1 and 5 posts", function () {
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

            for (var i = 0; i < 4; i++) {
                var writePostButton = ptor.findElement(protractor.By.name("writePost"));
                writePostButton.click();
                var postTitle = ptor.findElement(protractor.By.model("postTitle"));
                postTitle.clear();
                postTitle.sendKeys("Test post " + i);
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
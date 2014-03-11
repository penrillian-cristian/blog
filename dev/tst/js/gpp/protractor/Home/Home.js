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
            var loginButton = ptor.findElement(protractor.By.id("loginButton"));
            var registerButton = ptor.findElement(protractor.By.id("registerButton"));

            expect(loginButton.getTagName()).toBe("button");
            expect(registerButton.getTagName()).toBe("button");

            expect(loginButton.getText()).toBe("Login");
            expect(registerButton.getText()).toBe("Register");

        });

        var testFields;
        it("should have 2 empty fields for login", testFields = function () {
            var logUsernameField = ptor.findElement(protractor.By.id("loginUsernameField"));
            var logPasswordField = ptor.findElement(protractor.By.id("loginPasswordField"));
            //expect(logUsernameField).toBeDefined();
            //expect(logPasswordField).toBeDefined();

            expect(logUsernameField.getTagName()).toBe("input");
            expect(logPasswordField.getTagName()).toBe("input");


        });

        //TODO: move to unit testing ??
        xit("registered user should provide a valid email address", function () {
            var userEmail = ptor.findElement(protractor.By.id("registerEmailField"));
            var test = false;

            //userEmail.indexOf("f");
            /* if (userEmail.getText().contains("@") && userEmail.getText().contains(".")) {
             test = true;
             }
             expect(test);*/
        });

        xit("should print 1 category for each post", function () {
            var category = ptor.findElement(protractor.By.id("postCategory")).then(function (category) {
                expect(category.length).toEqual(1);
            });
            expect()

        });

        describe("When I click login", function () {


            it("should return an error message if the fields are empty", function () {
                var loginButton = ptor.findElement(protractor.By.id("loginButton"));
                loginButton.click();
                var loginResult = ptor.findElement(protractor.By.id("loginResult"));
                expect(loginResult.getText()).toBe("Required fields are empty");
            });

            it("should return an error message if the user is not registered", function () {
                var userLoginField = ptor.findElement(protractor.By.id("loginUsernameField"));
                userLoginField.sendKeys("ci");
                var passwordLoginField = ptor.findElement(protractor.By.id("loginPasswordField"));
                passwordLoginField.sendKeys("abc");

                var loginButton = ptor.findElement(protractor.By.id("loginButton"));
                loginButton.click();
                var loginResult = ptor.findElement(protractor.By.id("loginResult"));
                expect(loginResult.getText()).toBe("Invalid username or password");

            });
        });


        describe("When I click register", function () {


            it("should have 2 empty fields for register, one OK button, and one Cancel button ", function () {

                var registerButton = ptor.findElement(protractor.By.id("registerButton"));
                registerButton.click();

                var regUsernameField = ptor.findElement(protractor.By.id("registerUsernameField"));
                var regPasswordField = ptor.findElement(protractor.By.id("registerPasswordField"));
                var registerConfirmButton = ptor.findElement(protractor.By.id("registerConfirm"));
                var registerCancelButton = ptor.findElement(protractor.By.id("registerCancel"));

                expect(regUsernameField.getTagName()).toBe("input");
                expect(regPasswordField.getTagName()).toBe("input");
                expect(registerConfirmButton.getTagName()).toBe("button");
                expect(registerCancelButton.getTagName()).toBe("button");

            });

            it("should return an error message if the fields are empty", function () {

                var registerButton = ptor.findElement(protractor.By.id("registerConfirm"));
                registerButton.click();
                var registerResult = ptor.findElement(protractor.By.id("registerResult"));
                expect(registerResult.getText()).toBe("Required fields are empty");

            });


            it("should print confirmation, write post button and welcome message if registration is successful, together with logout button", function() {
                var userRegisterField = ptor.findElement(protractor.By.id("registerUsernameField"));
                userRegisterField.sendKeys("ci");
                var passwordRegisterField = ptor.findElement(protractor.By.id("registerPasswordField"));
                passwordRegisterField.sendKeys("abc");
                var registerConfirmButton = ptor.findElement(protractor.By.id("registerConfirm"));
                registerConfirmButton.click();
                var registerResult = ptor.findElement(protractor.By.id("registerResult"));
                expect(registerResult.getText()).toBe("Registration was successful");
                var welcomeText = ptor.findElement(protractor.By.id("welcomeText"));
                var logoutButton = ptor.findElement(protractor.By.id("logoutButton"));
                expect(welcomeText.getText()).toBe("Welcome ci!");
                expect(logoutButton.getTagName()).toBe("button");
                var writePost = ptor.findElement(protractor.By.id("writePost"));
                expect(writePost.getTagName()).toBe("button");

            });

            it("should return an error message if the username is already taken", function () {

                var logoutButton = ptor.findElement(protractor.By.id("logoutButton"));
                logoutButton.click();
                var registerButton = ptor.findElement(protractor.By.id("registerButton"));
                registerButton.click();

                var userRegisterField = ptor.findElement(protractor.By.id("registerUsernameField"));
                userRegisterField.sendKeys("ci");
                var passwordRegisterField = ptor.findElement(protractor.By.id("registerPasswordField"));
                passwordRegisterField.sendKeys("abcd");
                var registerConfirmButton = ptor.findElement(protractor.By.id("registerConfirm"));
                registerConfirmButton.click();
                var registerResult = ptor.findElement(protractor.By.id("registerResult"));
                expect(registerResult.getText()).toBe("Username already taken");

                //test cancel also
                var registerCancelButton = ptor.findElement(protractor.By.id("registerCancel"));
                registerCancelButton.click();

                var userLoginField = ptor.findElement(protractor.By.id("loginUsernameField"));
                userLoginField.sendKeys("ci");
                var passwordLoginField = ptor.findElement(protractor.By.id("loginPasswordField"));
                passwordLoginField.sendKeys("abc");

                var loginButton = ptor.findElement(protractor.By.id("loginButton"));
                loginButton.click();


            });


        });

        describe("When I click logout", function () {
            it("should show back the login screen and hide write ", function(){
               var logoutButton = ptor.findElement(protractor.By.id("logoutButton"));
               logoutButton.click();
               testButtons();
               testFields();
               var writePost = ptor.findElement(protractor.By.id("writePost"));
               expect(writePost.getText()).toBe("");

            });
            it("should present user with empty login fields", function(){
                var userLoginField = ptor.findElement(protractor.By.id("loginUsernameField"));
                var passwordLoginField = ptor.findElement(protractor.By.id("loginPasswordField"));
                expect(userLoginField.getAttribute('value')).toBe("");
                expect(passwordLoginField.getAttribute('value')).toBe("");


            });
        });

        describe("When I login again", function () {
            it("should successfully login the user and present the standard screen", function(){
                var userLoginField = ptor.findElement(protractor.By.id("loginUsernameField"));
                userLoginField.sendKeys("ci");
                var passwordLoginField = ptor.findElement(protractor.By.id("loginPasswordField"));
                passwordLoginField.sendKeys("abc");

                var loginButton = ptor.findElement(protractor.By.id("loginButton"));
                loginButton.click();
                var loginResult = ptor.findElement(protractor.By.id("loginResult"));
                expect(loginResult.getText()).toBe("Login was successful");

            });

        });

        describe("When user clicks write post", function () {


            it("should show empty post write fields", function(){
                var writePostButton = ptor.findElement(protractor.By.id("writePost"));
                writePostButton.click();
                var postTitle = ptor.findElement(protractor.By.id("pTitle"));
                var postCategory = ptor.findElement(protractor.By.id("pCategory"));
                var postText = ptor.findElement(protractor.By.id("pText"));

                expect(postTitle.getTagName()).toBe("input");
                expect(postCategory.getTagName()).toBe("input");
                expect(postText.getTagName()).toBe("textarea");

            });

            describe("When user confirms", function(){
                it("should display post on the screen", function(){
                    var postTitle = ptor.findElement(protractor.By.id("pTitle"));
                    var postCategory = ptor.findElement(protractor.By.id("pCategory"));
                    var postText = ptor.findElement(protractor.By.id("pText"));
                    var writeOk = ptor.findElement(protractor.By.id("writeOk"));
                    var writePostButton = ptor.findElement(protractor.By.id("writePost"));

                    for (var i = 0; i < 4; i++) {
                        postTitle.sendKeys("Test post " + i);
                        postCategory.sendKeys("Technology");
                        postText.sendKeys("I am writing a blog post");

                        writeOk.click();
                        writePostButton.click();
                    }
                    postTitle.sendKeys("Test post " + i);
                    postCategory.sendKeys("Technology");
                    postText.sendKeys("I am writing a blog post");

                    writeOk.click();
                });
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




    // NOT IMPLEMENTED: when user presses cancel, should go back to main screen
    // user presses write post, then completes fields and clicks ok
    // NOT IMPLEMENTED: if one field is empty, error message should appear
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
        it("should show between 1 and 5 posts", function () {

            var nextButton = ptor.findElement(protractor.By.id("nextButton"));
            nextButton.click();

            ptor.findElements(protractor.By.className("post")).then(function (postElements) {
                expect(postElements.length).toBeGreaterThan(0);
                expect(postElements.length).toBeLessThan(6);
            });
        });

    });


    describe("When user presses previous", function () {
        it("there should be between 1 and 5 posts", function () {
            var previousButton = ptor.findElement(protractor.By.id("previousButton"));
            previousButton.click();
            ptor.findElements(protractor.By.className("post")).then(function (postElements) {
                expect(postElements.length).toBeGreaterThan(0);
                expect(postElements.length).toBeLessThan(6);
            });
        });

    });


    // });
});
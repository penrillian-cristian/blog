describe("Given I have an open browser", function() {
    ptor = protractor.getInstance();//

    describe("When I navigate to the home page", function() {
        ptor.get("#/");



        it("should have the expected title", function() {
            var title = ptor.getTitle();
            expect(title).toEqual("Blog");

        });

        it("should have the expected welcome message", function() {
            var welcomeElement = ptor.findElement(protractor.By.className("welcome"));
            expect(welcomeElement.getText()).toEqual("Welcome to our blog");

        });

        it("should have 3 posts", function() {
            ptor.findElements(protractor.By.className("post")).then(function(postElements) {
                expect(postElements.length).toEqual(3);
            });
        });




    });
});

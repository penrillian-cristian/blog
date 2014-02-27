describe("Given I have an open browser", function() {
    ptor = protractor.getInstance();//

    describe("When I navigate to the home page", function() {
        ptor.get("#/");

        it("should have the expected chrome", function() {
            welcomeElement = ptor.findElement(protractor.By.className("welcome"));
            expect(welcomeElement.getText()).toEqual("Welcome to our blog");
        });
    });
});

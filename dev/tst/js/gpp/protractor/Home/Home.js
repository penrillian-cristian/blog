describe("Given I have an open browser", function() {
    ptor = protractor.getInstance();

    describe("When I navigate to the home page", function() {
        ptor.get("#/");

        it("should have the expected chrome", function() {
            message = ptor.findElement(protractor.By.className("todo"));
            expect(message.getText()).toEqual("todo");
        });
    });
});

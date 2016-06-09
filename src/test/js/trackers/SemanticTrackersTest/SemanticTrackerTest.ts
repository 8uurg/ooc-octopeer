
/**
 * Creates a test suite for the abstract classes.
 * Execute this function in your implementation test suite with the constructor of the class not executed.
 * e.g. `SemanticTrackerTest(ImplementSemanticTracker)`;
 */
export function SemanticTrackerTest(tracker: new () => SemanticTracker): void {

    describe("The Abstract Tracker", function () {
        let abstractTracker: SemanticTracker;
        let collector: TrackingCollector;

        beforeEach(function () {
            abstractTracker = new tracker();
            collector = jasmine.createSpyObj("collector", ["sendMessage"]);
            abstractTracker.withCollector(collector);
            jasmine.clock().install();
            jasmine.clock().mockDate();
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        it("should set the collector properly.", function () {
            let element = jasmine.createSpyObj("div", ["addEventListener"]);
            element.addEventListener.and.callFake((_: string, callback: any) => {
                callback();
            });

            let creationDate = Date.now() / 1000;
            abstractTracker.registerElement(element, "Comment textfield");

            expect(collector.sendMessage).toHaveBeenCalledTimes(1);
            expect(collector.sendMessage).toHaveBeenCalledWith({
                table: "semantic-events/",
                data: jasmine.objectContaining({
                    element_type: 501,
                    created_at: creationDate
                })
            });
        });

        it("should register an element via a selector correctly", function () {
            let element0 = jasmine.createSpyObj("div1", ["addEventListener"]);
            let element1 = jasmine.createSpyObj("div2", ["addEventListener"]);

            let callAddEventListener = (_: string, callback: any) => {
                callback();
            };

            element0.addEventListener.and.callFake(callAddEventListener);
            element1.addEventListener.and.callFake(callAddEventListener);

            let elements = [element0, element1];
            spyOn(document, "querySelectorAll").and.returnValue(elements);

            abstractTracker.registerElementWithSelector("", "Comment textfield");
            expect(collector.sendMessage).toHaveBeenCalledTimes(2);
        });

        it("should register a list of elements via a selector correctly", function () {
            let elementSelectors: [string, string][] = [];

            elementSelectors[0] = ["selector0", "Comment textfield"];
            elementSelectors[1] = ["selector1", "Add reaction"];

            let element0 = jasmine.createSpyObj("div1", ["addEventListener"]);
            let element1 = jasmine.createSpyObj("div2", ["addEventListener"]);

            element0.addEventListener.and.callFake((_: string, callback: any) => {
                callback();
            });
            element1.addEventListener.and.callFake((_: string, callback: any) => {
                callback();
            });

            spyOn(document, "querySelectorAll").and.returnValues([element0], [element1]);

            abstractTracker.registerElements(elementSelectors);
            expect(collector.sendMessage).toHaveBeenCalledTimes(2);
            expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
                data: jasmine.objectContaining({
                    element_type: 501
                })
            }));
            expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
                data: jasmine.objectContaining({
                    element_type: 110
                })
            }));
        });

        it("should throw an error when an element type is used that does not exist", function () {
            let element = jasmine.createSpyObj("elem", ["addEventListener"]);
            element.addEventListener.and.callFake((_: string, callback: any) => {
                callback();
            });

            expect(function () {
                abstractTracker.registerElement(element, "This element does not exist >:D");
            }).toThrowError(new RegExp("Illegal semantic element type name:"));
        });

        it("should throw an error when an event type does not exist.", function () {
            let element = jasmine.createSpyObj("elem", ["addEventListener"]);
            element.addEventListener.and.callFake((_: string, callback: any) => {
                callback();
            });
            abstractTracker = new WrongSemanticTracker();
            expect(function () {
                abstractTracker.registerElement(element, "Add reaction");
            }).toThrowError(new RegExp("Illegal semantic event type name:"));
        });
    });
}

/**
 * This class is used to test conditions which can only be triggered when a implementation
 * of `SemanticTracker` is flawed.
 */
class WrongSemanticTracker
    extends SemanticTracker {

    public registerElement(element: Element, eventName: string): void {
        element.addEventListener("click", () => {
            this.createMessage("This type does not exist!", eventName);
        });
    }
}
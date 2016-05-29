|      |            |
|------|------------|
|Group | Out of Context |
|Assignment|Sprint 5|
|Date|29/05/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 5.

Total: ****

| User Story | Score |
|------------|-------|
| definition |     |
| splitting  |     |
| responsibility |  |

| Learning from History | Score |
|-----------------------|-------|
| estimation            |      |
| prioritisation        |     |
| reflection            |      |

## Notes
* I took a closer look at you're point system and am now correcting earlier feedback:	
	* You're point system is not accurate (though it is precise) when it comes to the total time each team member spent.
	* See the pdf in the sprint_5 folder for details
* Good reflection except I don't see mention of SIG and creating a GitHub clone

#Code Evolution Quality Feedback

Total: ****

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |      |
| Architecture Design Document (ADD) |      |

|                     | Score |
|---------------------|-------|
| Code Change Quality |      |

| Code Readability | Score |
|------------------|-------|
| Formatting       |      |
| Naming           |      |
| Comments         |      |

| Continuous Integration | Score |
|------------------------|-------|
| Building               |      |
| Testing                |      |

|         | Score |
|---------|-------|
| Tooling |      |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |      |
| Code Review            |      |

##Notes
* ADD
	* Thanks for adding the diagrams
	* As mentioned in the meeting the class diagram is misleading
		* Tracking Collector seems to have several Trackers, instead of the listener that you make use of
	* RawEvent diagram is missing context and explanation
	* What do PK and FK mean?
	* Sequence diagrams / flow charts of how to the tools starts up and user interactions with the tool should be added
		* What happens when the user starts the tool?
		* What happens when the user opens a pr page?
		* What happens when the user navigates away to a different tab?
		* etc
* Why are `WindowResolutionJSON` and the others interfaces and not classes?
* `MousePositionTracker`
	* Magic Number - line 56 & 66 
		* consider making these const values with a name
* `MouseClickTracker`
	* Magic Number - line 42
		* consider making this a const value with a name
* Good explanation of test coverage
	* Keep updating this part to maintain a 10
* Trackers have duplicate code in `withCollector`
	* Consider a common place for this code
		* Abstract class
		* Common interface and factory
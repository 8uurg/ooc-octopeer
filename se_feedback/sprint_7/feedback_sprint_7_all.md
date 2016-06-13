|      |            |
|------|------------|
|Group | Out of Context |
|Assignment|Sprint 7|
|Date|12/06/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 7.

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
* Good Job!
* Thanks for adding the table with extra hours!
* Laurens has 33% to 45% less hours than the other team members??

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
* Good job fixing the ADD and incorporating the feedback
* Declarations of interfaces should be explained somewhere (great idea btw!!)
* `LastMessageThrottle`
	* `maxDelay` the time units are not clear (I assume milliseconds) add a comment or change the name to incorporate this fact
* Throttles seem to be a candidate for a Decorator Pattern
	* especially `StartEndThrottle`
* `Tracker` (in RawTrackers)
	* naming is confusing since `SemanticTracker` does not inherit from it
	* rename to RawTracker?
* `DatabaseSchemes`
	* Well done renaming these to fall in line with the explanation you give in your coding choices document